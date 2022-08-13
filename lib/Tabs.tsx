import classNames from "classnames";
import React from "react";

export interface TabItem {
  label: string;
  content: JSX.Element
}

export function Tabs({tabs, initTab}: {
  tabs: TabItem[];
  initTab?: number;
}) {
  const [currentTab, setCurrentTab] = React.useState(initTab || 0);
  const content = React.useMemo(() => tabs?.[currentTab]?.content, [tabs, currentTab]);

  return (
    <div>
      <div className="sm:hidden">
        <TabsMobile tabs={tabs} currentTab={currentTab} onChange={t => setCurrentTab(t)}/>
      </div>
      <div className="hidden sm:block">
        <TabsLarge tabs={tabs} currentTab={currentTab} onChange={t => setCurrentTab(t)}/>
      </div>
      <div>{content}</div>
    </div>
  );
}

type TabsProps = {
  tabs: TabItem[];
  currentTab: number;
  onChange: (tab: number) => void;
}

function TabsMobile(props: TabsProps) {
  return (
    <div className="border-b border-gray-200 overflow-x-auto overflow-y-hidden flex justify-between items-center gap-2">
      <nav className="flex gap-x-2" aria-label="Tabs">
        {props.tabs.map((tab, index) => (
          <button key={tab.label} onClick={() => props.onChange(index)}>
            <div
              className={classNames(
                index === props.currentTab
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
              )}
            >
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}

function TabsLarge(props: TabsProps) {
  return (
    <div className="border-b border-gray-200 flex justify-between items-center gap-2">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {props.tabs.map((tab, index) => (
          <button key={tab.label} onClick={() => props.onChange(index)}>
            <div
              className={classNames(
                index === props.currentTab
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
              )}
            >
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}
