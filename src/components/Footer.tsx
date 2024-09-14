import { IconButton } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const socialIcons = [
  {
    link: 'https://instagram.com/nikolasgustavson',
    icon: InstagramIcon
  },
  {
    link: 'https://github.com/thefinnishstranger',
    icon: GitHubIcon
  },
  {
    link: 'https://x.com/nikgustavson',
    icon: XIcon
  },
  {
    link: 'https://www.facebook.com/nikolas.gustavson',
    icon: FacebookIcon
  },
  {
    link: 'https://www.youtube.com/@nikolasgustavson2493',
    icon: YouTubeIcon
  },
]

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white py-20 text-center tracking-tight">
      <div className="">
        <div className="flex justify-center">
          <a href="/" className="transition transform hover:text-slate-200 duration-150 mr-6 ml-6">
            Home
          </a>
          <a href="/calculator" className="transition transform hover:text-slate-200 duration-150 mr-6 ml-6">
            Budget Calculator
          </a>
          <a href="/account" className="transition transform hover:text-slate-200 duration-150 mr-6 ml-6">
            Dashboard
          </a>
          <a href="/about" className="transition transform hover:text-slate-200 duration-150 mr-6 ml-6">
            About us
          </a>
        </div>
        <div className="">
        </div>
        <div className="">
          
        </div>
        <div className="">
          
        </div>
      </div>
      <div>
        {socialIcons.map((social) => (
          <IconButton sx={{
            ml: 1,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent"
            }
            }}>
            <a href={social.link} target='_blank' rel='noopener noreferrer' className='text-white m-4 transition transform hover:text-slate-200 duration-150'>
            <social.icon />
            </a>
          </IconButton>
        ))}
      </div>
      <div className="text-sm font-thin mt-1">
        © 2024 Budget, Inc. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
