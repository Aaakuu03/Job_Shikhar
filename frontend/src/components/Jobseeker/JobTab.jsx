import AppliedJob from "./AppliedJob";
import SavedJob from "./SavedJob";

export default function JobTab() {
  return (
    <div className="mr-10 ml-10 ">
      <div role="tablist" className="tabs tabs-lifted tabs-lg ">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab "
          aria-label="Applied Jobs"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <AppliedJob />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Saved Jobs"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <SavedJob />
        </div>
      </div>
    </div>
  );
}
