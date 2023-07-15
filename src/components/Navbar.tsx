"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <nav className="bg-sky-200 shadow-sm ">
      <div className="md:w-10/12 mx-auto py-3 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task-Management</h1>
        <ul className="flex gap-4 font-semibold text-xl">
          <li>
            <Link
              href={"/"}
              className={pathName === "/" ? "btn btn-sm btn-warning" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/add-task"}
              className={
                pathName === "/add-task" ? "btn btn-sm btn-warning" : ""
              }
            >
              Add Task
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
