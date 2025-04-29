import UpdateEducation from "../../../components/Jobseeker/Education/UpdateEducation";

import ProfileSide from "../../../components/Jobseeker/ProfileSide";

export default function EditEducation() {
  return (
    <div className="m-10">
      <div className="p-4 border border-[#B3B3B3] bg-[#F0EFEF] mb-1">
        <h3 className="text-lg font-semibold">Account Settings</h3>
      </div>
      <div className=" flex border border-[#B3B3B3] bg-[#F2F0EF] ">
        <div className="flex  border border-[#B3B3B3] bg-[#F2F0EF] shadow-xl  font-sans overflow">
          <ProfileSide />
        </div>
        <div className="flex-1 border-b border-[#B3B3B3] bg-[#F2F0EF]">
          <div className="relative border-b border-[#B3B3B3]  p-4 font-bold">
            Education Information - Edit
          </div>
          <section className=" p-1 bg-[#F2F0EF] ">
            <div className="border mx-auto shadow-gray-500 max-w-4xl p-10 my-5">
              <UpdateEducation />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
