import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect, useState } from "react";

const socialIcons = [
  {
    link: "https://instagram.com/nikolasgustavson",
    icon: InstagramIcon,
  },
  {
    link: "https://github.com/thefinnishstranger",
    icon: GitHubIcon,
  },
  {
    link: "https://x.com/nikgustavson",
    icon: XIcon,
  },
  {
    link: "https://www.facebook.com/nikolas.gustavson",
    icon: FacebookIcon,
  },
  {
    link: "https://www.youtube.com/@nikolasgustavson2493",
    icon: YouTubeIcon,
  },
];

const Footer = () => {
  const [user, setUser] = useState(null);

  const refetch = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
      console.log("User updated:", JSON.parse(loggedUserJSON));
    } else {
      setUser(null);
      console.log("No user found in localStorage");
    }
  };

  useEffect(() => {
    // Fetch user on mount
    refetch();

    // Listen for localStorage changes
    const handleStorageChange = () => {
      console.log("Storage event detected, refetching user data...");
      refetch();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getProperDirection = () => {
    if (user) {
      return "/account"
    } else {
      return "/login"
    }
  }
  return (
    <footer className="bg-green-500 text-white py-10 text-center font-semibold">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-2 mb-6">
        <a
          href="/"
          className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
        >
          Home
        </a>
        <a
          href="/calculator"
          className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
        >
          Budget Calculator
        </a>
          <a
            href={getProperDirection()}
            className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
          >
            Dashboard
          </a>
        <a
          href="/about"
          className="transition transform hover:text-slate-200 duration-150 px-2 sm:px-1"
        >
          About us
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {socialIcons.map((social) => (
          <IconButton
            key={social.link}
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition transform hover:text-slate-200 duration-150"
            >
              <social.icon />
            </a>
          </IconButton>
        ))}
      </div>
      <div className="text-sm font-thin mt-4">
        © 2024 Budget, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
