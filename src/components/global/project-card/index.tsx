"use client";
import { JsonValue } from "@prisma/client/runtime/library";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemVariants, themes, timeAgo } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";

import ThumbnailPreview from "@/components/global/project-card/thumbnail-preview";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete: boolean;
  slideData: JsonValue;
 
  themeName?: string;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDelete,
  slideData,

  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const router = useRouter();
  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error", {
        description: "Project not found",
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Error", {
          description: res.error || "Something went wrong. Please contact support",
        });
        return
      }

      setOpen(false);
      router.refresh();
      toast.success("Sucess", {
        description: "Project recovered successfully",
      });
      

    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please contact support",
      });
    }
  };

  const handleDelete = async() => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error", {
        description: "Project not found",
      });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Error", {
          description: res.error || "Something went wrong. Please contact support",
        });
        return
      }

      setOpen(false);
      router.refresh();
      toast.success("Sucess", {
        description: "Project recovered successfully",
      });
      

    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please contact support",
      });
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted"
      }`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        {/* <ThumbnailPreview
          //   slide={JSON.parse(JSON.stringify(slideData)?.[0])}
          theme={theme}
        /> */}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>

            {isDelete ? (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecover}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
              description="This will recover your project and restore your data"
              className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
              loading={loading}
              open={open}
              handleOpen={() => setOpen(!open)}
              onClick={handleDelete}
            >
              <Button
                size={"sm"}
                variant={"ghost"}
                className="bg-background-80 dark:hover:bg-background-90"
                disabled={loading}
              >
                Delete
              </Button>
            </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
