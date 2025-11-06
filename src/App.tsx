import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Smile,
  X,
  GripVertical,
} from "lucide-react";
import { SidebarSection } from "./components/SidebarSection";
import { MomentCard } from "./components/MomentCard";
import { HashtagItem } from "./components/HashtagItem";
import { FunctionBar } from "./components/FunctionBar";
import { GlobalBar } from "./components/GlobalBar";
import { AiCard } from "./components/AiCard";
import { FloatingMiraChat } from "./components/FloatingMiraChat";
import { Switch } from "./components/ui/switch";

export default function App() {
  const [selectedMoment, setSelectedMoment] =
    useState("cooking-diary");
  const [mode, setMode] = useState<"focus" | "action">(
    "action",
  );
  const [tabs, setTabs] = useState([
    { id: "all", label: "All Moments" },
    { id: "timeline", label: "Timeline" },
    { id: "tags", label: "Tags" },
  ]);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedPinned, setExpandedPinned] = useState(false);
  const [expandedRecent, setExpandedRecent] = useState(false);
  const [expandedCategories, setExpandedCategories] =
    useState(true);
  const [collapsedPinned, setCollapsedPinned] = useState(false);
  const [collapsedRecent, setCollapsedRecent] = useState(false);

  // Sidebar resizing
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const MIN_SIDEBAR_WIDTH = 220;
  const MAX_SIDEBAR_WIDTH = 400;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      if (
        newWidth >= MIN_SIDEBAR_WIDTH &&
        newWidth <= MAX_SIDEBAR_WIDTH
      ) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  // All pinned moments data
  const allPinnedMoments = [
    {
      id: "cooking-diary",
      title: "Cooking Diary 2025",
      date: "Today",
      actionCount: 5,
      recentAction: "edited 2 hours ago",
      isPinned: true,
      isAiGenerated: false,
    },
    {
      id: "morning-pages",
      title: "Morning Pages",
      date: "Today",
      actionCount: 2,
      recentAction: "completed 1 to-do",
      isPinned: true,
      isAiGenerated: false,
    },
    {
      id: "workout-log",
      title: "Workout Log",
      date: "Yesterday",
      actionCount: 3,
      recentAction: "edited yesterday",
      isPinned: true,
      isAiGenerated: false,
    },
    {
      id: "project-notes",
      title: "Project Notes",
      date: "Oct 29",
      actionCount: 7,
      recentAction: "added 2 images",
      isPinned: true,
      isAiGenerated: false,
    },
  ];

  // All recent moments data
  const allRecentMoments = [
    {
      id: "morning-routine",
      title: "Morning Routine Ideas",
      date: "Yesterday",
      actionCount: 3,
      recentAction: "edited yesterday",
      isPinned: false,
      isAiGenerated: true,
    },
    {
      id: "travel-plans",
      title: "Summer Travel Plans",
      date: "Oct 28",
      actionCount: 8,
      recentAction: "completed checklist",
      isPinned: false,
      isAiGenerated: false,
    },
    {
      id: "book-reflections",
      title: "Book Reflections",
      date: "Oct 26",
      actionCount: 4,
      recentAction: "added quote",
      isPinned: false,
      isAiGenerated: false,
    },
    {
      id: "meeting-notes",
      title: "Meeting Notes Q4",
      date: "Oct 25",
      actionCount: 6,
      recentAction: "edited 3 days ago",
      isPinned: false,
      isAiGenerated: false,
    },
    {
      id: "recipe-experiments",
      title: "Recipe Experiments",
      date: "Oct 24",
      actionCount: 5,
      recentAction: "added video",
      isPinned: false,
      isAiGenerated: false,
    },
  ];

  // Show only 3 items by default
  const displayedPinnedMoments = expandedPinned
    ? allPinnedMoments
    : allPinnedMoments.slice(0, 3);
  const displayedRecentMoments = expandedRecent
    ? allRecentMoments
    : allRecentMoments.slice(0, 3);

  const interestHashtags = [
    {
      hashtag: "#Photography",
      moments: [
        {
          title: "Street Photography Techniques",
          date: "Oct 25",
          actionCount: 6,
        },
        {
          title: "Portrait Lighting Tips",
          date: "Oct 22",
          actionCount: 4,
        },
      ],
    },
    {
      hashtag: "#Cooking",
      moments: [
        {
          title: "Cooking Diary 2025",
          date: "Today",
          actionCount: 5,
        },
        {
          title: "Italian Recipes Collection",
          date: "Oct 29",
          actionCount: 7,
        },
      ],
    },
    {
      hashtag: "#Design",
      moments: [
        {
          title: "UI/UX Design Principles",
          date: "Oct 28",
          actionCount: 4,
        },
        {
          title: "Color Theory Notes",
          date: "Oct 26",
          actionCount: 3,
        },
      ],
    },
    {
      hashtag: "#Programming",
      moments: [
        {
          title: "React Best Practices",
          date: "Oct 27",
          actionCount: 8,
        },
        {
          title: "JavaScript Tips",
          date: "Oct 24",
          actionCount: 5,
        },
      ],
    },
  ];

  const themesHashtags = [
    {
      hashtag: "#Happy",
      moments: [
        {
          title: "Gratitude Journal",
          date: "Oct 24",
          actionCount: 3,
        },
        {
          title: "Celebration Moments",
          date: "Oct 21",
          actionCount: 2,
        },
      ],
    },
    {
      hashtag: "#Shopping",
      moments: [
        {
          title: "Home Decor Ideas",
          date: "Oct 22",
          actionCount: 7,
        },
      ],
    },
  ];

  const aiHashtags = [
    {
      hashtag: "#Creative Projects",
      moments: [
        {
          title: "Art Portfolio 2025",
          date: "Oct 20",
          actionCount: 9,
        },
        {
          title: "Design Inspiration Board",
          date: "Oct 18",
          actionCount: 5,
        },
      ],
      isAiGenerated: true,
    },
    {
      hashtag: "#Self-improvement",
      moments: [
        {
          title: "Morning Routine Ideas",
          date: "Yesterday",
          actionCount: 3,
        },
        {
          title: "Productivity Hacks",
          date: "Oct 27",
          actionCount: 6,
        },
      ],
      isAiGenerated: true,
    },
  ];

  const handlePin = (id: string) => {
    console.log("Pin/Unpin moment:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete moment:", id);
  };

  const handleCloseTab = (tabId: string) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== tabId);
      setTabs(newTabs);
      if (activeTab === tabId) {
        setActiveTab(newTabs[0].id);
      }
    }
  };

  const handleAddTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      label: `New Tab ${tabs.length + 1}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  return (
    <div className="h-screen bg-[#F8F4ED] flex overflow-hidden">
      {/* Left Sidebar - Navigation with stronger hierarchy */}
      <aside
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}px` }}
        className="flex-shrink-0 bg-[#F8F4ED] border-r border-[#A49689]/30 flex flex-col overflow-hidden shadow-sm relative"
      >
        <div className="p-6 pb-4 bg-white/50 border-b border-[#A49689]/30">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[#2E2E2E] bg-gradient-to-r from-[#3A4C44] to-[#6E7C74] bg-clip-text text-transparent">
              Moments
            </h1>
            <button className="p-2 rounded-xl bg-gradient-to-r from-[#3A4C44] to-[#C3A46F] hover:shadow-lg transition-all text-white">
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7C74]"
              size={16}
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search moments…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#A49689]/20 focus:outline-none focus:border-[#3A4C44] focus:ring-2 focus:ring-[#3A4C44]/20 transition-all text-sm placeholder:text-[#6E7C74]"
            />
          </div>
        </div>

        {/* Scrollable sections area */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Pinned */}
          <SidebarSection
            title="Pinned"
            accentColor="pinned"
            showExpandAll={allPinnedMoments.length > 3}
            isExpandedAll={expandedPinned}
            onExpandAll={() => setExpandedPinned(true)}
            onCollapseToggle={(isCollapsed) => {
              setCollapsedPinned(isCollapsed);
              if (isCollapsed) {
                setExpandedPinned(false);
              }
            }}
          >
            {displayedPinnedMoments.map((moment) => (
              <MomentCard
                key={moment.id}
                title={moment.title}
                date={moment.date}
                actionCount={moment.actionCount}
                recentAction={moment.recentAction}
                isPinned={moment.isPinned}
                isAiGenerated={moment.isAiGenerated}
                isSelected={selectedMoment === moment.id}
                onClick={() => setSelectedMoment(moment.id)}
                onPin={() => handlePin(moment.id)}
                onDelete={() => handleDelete(moment.id)}
              />
            ))}
          </SidebarSection>

          {/* Recent */}
          <SidebarSection
            title="Recent"
            accentColor="recent"
            showExpandAll={allRecentMoments.length > 3}
            isExpandedAll={expandedRecent}
            onExpandAll={() => setExpandedRecent(true)}
            onCollapseToggle={(isCollapsed) => {
              setCollapsedRecent(isCollapsed);
              if (isCollapsed) {
                setExpandedRecent(false);
              }
            }}
          >
            {displayedRecentMoments.map((moment) => (
              <MomentCard
                key={moment.id}
                title={moment.title}
                date={moment.date}
                actionCount={moment.actionCount}
                recentAction={moment.recentAction}
                isPinned={moment.isPinned}
                isAiGenerated={moment.isAiGenerated}
                isSelected={selectedMoment === moment.id}
                onClick={() => setSelectedMoment(moment.id)}
                onPin={() => handlePin(moment.id)}
                onDelete={() => handleDelete(moment.id)}
              />
            ))}
          </SidebarSection>

          {/* Categories */}
          <SidebarSection
            title="Categories"
            accentColor="categories"
            showExpandAll={true}
            isExpandedAll={expandedCategories}
            onExpandAll={() =>
              setExpandedCategories(!expandedCategories)
            }
          >
            {/* Interests sub-group */}
            {expandedCategories && (
              <div className="mb-3">
                <SidebarSection
                  title="Interests"
                  accentColor="interest"
                  defaultOpen={true}
                  isSubSection={true}
                >
                  {interestHashtags.map((item) => (
                    <HashtagItem
                      key={item.hashtag}
                      {...item}
                      onPin={() =>
                        console.log(
                          "Pin hashtag:",
                          item.hashtag,
                        )
                      }
                      onDelete={() =>
                        console.log(
                          "Delete from hashtag:",
                          item.hashtag,
                        )
                      }
                    />
                  ))}
                </SidebarSection>
              </div>
            )}

            {/* Themes & Moods sub-group */}
            {expandedCategories && (
              <div className="mb-3">
                <SidebarSection
                  title="Themes & Moods"
                  accentColor="themes"
                  defaultOpen={true}
                  isSubSection={true}
                >
                  {themesHashtags.map((item) => (
                    <HashtagItem
                      key={item.hashtag}
                      {...item}
                      onPin={() =>
                        console.log(
                          "Pin hashtag:",
                          item.hashtag,
                        )
                      }
                      onDelete={() =>
                        console.log(
                          "Delete from hashtag:",
                          item.hashtag,
                        )
                      }
                    />
                  ))}
                </SidebarSection>
              </div>
            )}

            {/* Mira Generated #s sub-group */}
            {expandedCategories && (
              <div>
                <SidebarSection
                  title="Mira Generated #s"
                  accentColor="ai-generated"
                  defaultOpen={true}
                  isSubSection={true}
                >
                  {aiHashtags.map((item) => (
                    <HashtagItem
                      key={item.hashtag}
                      {...item}
                      onPin={() =>
                        console.log(
                          "Pin hashtag:",
                          item.hashtag,
                        )
                      }
                      onDelete={() =>
                        console.log(
                          "Delete from hashtag:",
                          item.hashtag,
                        )
                      }
                    />
                  ))}
                </SidebarSection>
              </div>
            )}

            {/* Collapsed view - show summary */}
            {!expandedCategories && (
              <div className="px-2 py-2 text-xs text-[#6E7C74]">
                {interestHashtags.length +
                  themesHashtags.length +
                  aiHashtags.length}{" "}
                categories
              </div>
            )}
          </SidebarSection>
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={handleResizeStart}
          className={`
            absolute top-0 right-0 w-1 h-full cursor-col-resize group hover:bg-[#697768]/20 transition-colors
            ${isResizing ? "bg-[#697768]/30" : ""}
          `}
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-[#697768] rounded-full p-1 shadow-md">
              <GripVertical
                size={12}
                className="text-white"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Center Content Area - Wrapped in rounded box */}
      <div className="flex-1 flex overflow-hidden p-4 bg-[#F8F4ED]">
        <main className="flex-1 flex flex-col overflow-hidden bg-white rounded-2xl border border-[#DDE3DA]/60 shadow-lg mr-4">
          {/* Tab Bar with close buttons and add tab */}
          <div
            className="sticky top-0 z-20 bg-gradient-to-b from-[#E8E5DD]/50 to-[#D8CBB5]/20 backdrop-blur-xl border-b border-[rgba(164,150,137,0.2)]"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            <div className="flex items-end h-9 pl-4 pr-2 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                  group relative px-4 pr-8 h-[30px] text-sm font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-white text-[#2E2E2E]"
                      : "bg-white/30 text-[#6E7C74] hover:bg-white/60 hover:text-[#2E2E2E]"
                  }
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3A4C44] focus-visible:outline-offset-2
                  overflow-visible
                `}
                  style={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    boxShadow:
                      activeTab === tab.id
                        ? "0 -2px 4px rgba(52,47,42,0.08), 0 1px 0 0 white"
                        : "none",
                    marginBottom:
                      activeTab === tab.id ? "0" : "1px",
                  }}
                >
                  <span className="relative z-10">
                    {tab.label}
                  </span>

                  {/* Close button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseTab(tab.id);
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[#A44A3F]/20 text-[#6E7C74] hover:text-[#A44A3F] opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  >
                    <X size={12} strokeWidth={2} />
                  </button>

                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C3A46F] via-[#3A4C44] to-[#A49689]" />
                  )}
                </button>
              ))}

              {/* Add Tab Button */}
              <button
                onClick={handleAddTab}
                className="flex items-center justify-center w-8 h-[30px] mb-[1px] rounded-t-lg bg-white/30 hover:bg-white/60 text-[#3A4C44] transition-all"
                title="Add new tab"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>

              <div className="flex-1" />
            </div>
          </div>

          {/* Function & Global Bars (sticky) - Fixed width container */}
          <div className="sticky top-9 z-10 px-6 py-3 bg-white/95 backdrop-blur-sm border-b border-[rgba(164,150,137,0.2)]">
            <div className="max-w-4xl flex items-center justify-between gap-4">
              <FunctionBar />
              <GlobalBar mode={mode} onModeChange={setMode} />
            </div>
          </div>

          {/* Content Area (scrollable) - Reduced padding for notebook feel */}
          <div className="flex-1 overflow-y-auto px-8 py-6 bg-white">
            <div className="max-w-4xl pb-12">
              {/* Moment Title Row */}
              <div className="flex items-center gap-4 mb-8">
                <button className="text-[#6E7C74] hover:text-[#2E2E2E] transition-colors p-2 rounded-xl hover:bg-white">
                  <Smile size={20} strokeWidth={2} />
                </button>

                <input
                  type="text"
                  defaultValue="Cooking Diary 2025"
                  className="flex-1 text-[#2E2E2E] bg-transparent border-none outline-none focus:outline-none placeholder:text-[#6E7C74]"
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                  }}
                />
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                {/* Text Block 1 */}
                <div className="group relative">
                  <p className="text-[#2E2E2E] leading-relaxed">
                    Today I tried a new pasta recipe with
                    homemade pesto. The basil from the garden
                    made all the difference - so fresh and
                    aromatic! 🌿
                  </p>
                </div>

                {/* Inline AI Card */}
                <AiCard
                  prefix="Mira suggests:"
                  insight="Based on your cooking moments, you might enjoy exploring Mediterranean cuisine."
                  todoItem="Research Greek and Turkish recipes"
                  mode={mode}
                  onAddTodo={() =>
                    console.log("Added to todo list")
                  }
                  onDelete={() => console.log("Card deleted")}
                  onViewDetails={() =>
                    console.log("View details clicked")
                  }
                />

                {/* Text Block 2 */}
                <div className="group relative">
                  <p className="text-[#2E2E2E] leading-relaxed">
                    Notes for next time: use less garlic in the
                    pesto (3 cloves instead of 5), and toast the
                    pine nuts longer for a deeper flavor.
                  </p>
                </div>

                {/* Text Block 3 */}
                <div className="group relative">
                  <h3 className="text-[#2E2E2E] mb-2">
                    Ingredients Used:
                  </h3>
                  <ul className="list-disc list-inside text-[#2E2E2E] space-y-1">
                    <li>Fresh basil leaves</li>
                    <li>Pine nuts</li>
                    <li>Parmesan cheese</li>
                    <li>Garlic cloves</li>
                    <li>Extra virgin olive oil</li>
                  </ul>
                </div>

                {/* Text Block 4 */}
                <div className="group relative">
                  <h3 className="text-[#2E2E2E] mb-2">
                    Cooking Process:
                  </h3>
                  <p className="text-[#2E2E2E] leading-relaxed">
                    First, I toasted the pine nuts in a dry pan
                    until golden brown. The aroma filled the
                    kitchen! Then blended all ingredients in the
                    food processor, adding olive oil gradually
                    until reaching the perfect consistency.
                  </p>
                </div>

                {/* Text Block 5 */}
                <div className="group relative">
                  <p className="text-[#2E2E2E] leading-relaxed">
                    Served immediately with perfectly al dente
                    linguine. The pasta water helped emulsify
                    the pesto beautifully. Everyone loved it!
                    ⭐️
                  </p>
                </div>

                {/* Text Block 6 */}
                <div className="group relative">
                  <h3 className="text-[#2E2E2E] mb-2">
                    Tips & Tricks:
                  </h3>
                  <ul className="list-disc list-inside text-[#2E2E2E] space-y-1">
                    <li>
                      Always use fresh basil for the best flavor
                    </li>
                    <li>Toast pine nuts before blending</li>
                    <li>
                      Add pasta water to help the sauce coat
                      better
                    </li>
                    <li>Serve immediately for best results</li>
                    <li>
                      Store leftovers with a layer of olive oil
                      on top
                    </li>
                  </ul>
                </div>

                {/* Text Block 7 */}
                <div className="group relative">
                  <p className="text-[#2E2E2E] leading-relaxed">
                    Planning to try variations next week - maybe
                    with arugula instead of basil, or adding
                    sun-dried tomatoes. The possibilities are
                    endless! 🍝
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel - Mira Chat */}
        <FloatingMiraChat />
      </div>
    </div>
  );
}