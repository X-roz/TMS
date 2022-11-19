import FaceIcon from '@mui/icons-material/Face';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const SidebarData =[
    {
        title:"Profile",
        icon:<FaceIcon />,
        link:""
    },
    {
        title:"Home",
        icon:<HomeIcon />,
        link:"/show-truck"
    },
    {
        title:"Add Truck",
        icon:<LocalShippingIcon />,
        link:"/add-truck"
    }
]

export default SidebarData;