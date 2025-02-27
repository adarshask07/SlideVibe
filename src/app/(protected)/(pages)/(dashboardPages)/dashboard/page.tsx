import { getAllProjects } from "@/actions/project";
import { SignOutButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {

  const projects = getAllProjects()
  return (
    <>
      <div className="w-full flex flex-col gap-6 relative ">
        <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
              Projects
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All of your work in one place
          </p>
          </div>
        </div>
        {/* {  projects  } */}
      </div>
      {/* <SignOutButton /> */}
    </>
  );
};

export default DashboardPage;
