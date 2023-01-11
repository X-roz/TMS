import FaceIcon from '@mui/icons-material/Face';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const SidebarData =[
    {
        title:"Profile",
        icon:<FaceIcon />,
        link:""
    },
    {
        title:"Trucks",
        icon:<HomeIcon />,
        link:"/show-truck"
    },
    {
        title:"Add Truck",
        icon:<LocalShippingIcon />,
        link:"/add-truck"
    },
    {
        title:"Invoice",
        icon:<NoteAddIcon />,
        link:""
    }
]

export default SidebarData;