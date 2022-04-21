// Import all components here
import Dashboard from './booking/Dashboard/Dashboard';
import Trains from './booking/train/train';
import Schedule from './booking/Schedule/schedule';
import Passangers from './booking/Passangers/Passangers';
import Delivery from './booking/Delivery/Delivery';
import Journeys from './booking/Journeys/Journeys';
import CourseDetails from './booking/Journeys/JourneysDetails';
import Library from './booking/Library/Library';
import Holiday from './booking/Holiday/Holiday';
import Calendar from './booking/Calendar/Calendar';
import ChatApp from './booking/ChatApp/ChatApp';
import Station from './booking/Station/Station';
import FileManager from './booking/FileManager/FileManager';
import Payments from './admin/Payments/Payments';
import Noticeboard from './admin/Noticeboard/Noticeboard';
import Taskboard from './admin/Taskboard/Taskboard';
import Hostel from './admin/Hostel/Hostel';
import Transports from './admin/Transports/Transports';
import Attandance from './admin/Attandance/Attandance';
import Leave from './admin/Leave/Leave';
import Setting from './admin/Setting/Setting';
import SocialMedia from './booking/SocialMedia/SocialMedia';
import Email from './booking/Email/Email';
import EmailView from './booking/Email/EmailView';
import Compose from './booking/Email/Compose';
import PageSearch from './booking/Page/PageSearch';
import PageProfile from './booking/Page/PageProfile';
import PageInvoices from './booking/Page/PageInvoices';
import PagePricing from './booking/Page/PagePricing';
import PageTimeline from './booking/Page/PageTimeline';
import PageEmpty from './booking/Page/PageEmpty';
import OurCentre from './booking/OurCentre/OurCentre';
import Gallery from './booking/Gallery/Gallery';
import Login from './Authentication/login';
import Signup from './Authentication/signup';
import ForgotPassword from './Authentication/forgotpassword';
import NotFound from './Authentication/404';
import InternalServer from './Authentication/500';

const Routes = [
    {
        path: "/gallery",
        name: 'gallery',
        exact: true,
        pageTitle: "Gallery",
        component: Gallery
    },
    {
        path: "/ourCentre",
        name: 'ourCentre',
        exact: true,
        pageTitle: "OurCentre",
        component: OurCentre
    },
    {
        path: "/pageEmpty",
        name: 'pageEmpty',
        exact: true,
        pageTitle: "PageEmpty",
        component: PageEmpty
    },
    {
        path: "/pageTimeline",
        name: 'pageTimeline',
        exact: true,
        pageTitle: "PageTimeline",
        component: PageTimeline
    },
    {
        path: "/pagePricing",
        name: 'pagePricing',
        exact: true,
        pageTitle: "PagePricing",
        component: PagePricing
    },
    {
        path: "/pageInvoices",
        name: 'pageInvoices',
        exact: true,
        pageTitle: "PageInvoices",
        component: PageInvoices
    },
    {
        path: "/pageProfile",
        name: 'pageProfile',
        exact: true,
        pageTitle: "PageProfile",
        component: PageProfile
    },
    {
        path: "/pageSearch",
        name: 'pageSearch',
        exact: true,
        pageTitle: "PageSearch",
        component: PageSearch
    },
    {
        path: "/compose",
        name: 'compose',
        exact: true,
        pageTitle: "Compose",
        component: Compose
    },
    {
        path: "/emailView",
        name: 'emailView',
        exact: true,
        pageTitle: "EmailView",
        component: EmailView
    },
    {
        path: "/email",
        name: 'email',
        exact: true,
        pageTitle: "Email",
        component: Email
    },
    {
        path: "/socialMedia",
        name: 'socialMedia',
        exact: true,
        pageTitle: "socialMedia",
        component: SocialMedia
    },
    {
        path: "/setting",
        name: 'setting',
        exact: true,
        pageTitle: "setting",
        component: Setting
    },
    {
        path: "/leave",
        name: 'leave',
        exact: true,
        pageTitle: "leave",
        component: Leave
    },
    {
        path: "/attandance",
        name: 'attandance',
        exact: true,
        pageTitle: "attandance",
        component: Attandance
    },
    {
        path: "/transports",
        name: 'transports',
        exact: true,
        pageTitle: "transports",
        component: Transports
    },
    {
        path: "/hostel",
        name: 'hostel',
        exact: true,
        pageTitle: "hostel",
        component: Hostel
    },
    {
        path: "/taskboard",
        name: 'taskboard',
        exact: true,
        pageTitle: "taskboard",
        component: Taskboard
    },
    {
        path: "/noticeboard",
        name: 'noticeboard',
        exact: true,
        pageTitle: "noticeboard",
        component: Noticeboard
    },
    {
        path: "/payments",
        name: 'payments',
        exact: true,
        pageTitle: "Payments",
        component: Payments
    },
    {
        path: "/filemanager",
        name: 'filemanager',
        exact: true,
        pageTitle: "FileManager",
        component: FileManager
    },
    {
        path: "/station",
        name: 'station',
        exact: true,
        pageTitle: "Station",
        component: Station
    },
    {
        path: "/chat",
        name: 'chatApp',
        exact: true,
        pageTitle: "ChatApp",
        component: ChatApp
    },
    {
        path: "/events",
        name: 'calendar',
        exact: true,
        pageTitle: "Calendar",
        component: Calendar
    },
    {
        path: "/holiday",
        name: 'holiday',
        exact: true,
        pageTitle: "Holiday",
        component: Holiday
    },
    {
        path: "/library",
        name: 'library',
        exact: true,
        pageTitle: "Library",
        component: Library
    },
    {
        path: "/journeys",
        name: 'journeys',
        exact: true,
        pageTitle: "journeys",
        component: Journeys
    },
    {
        path: "/courseDetails",
        name: 'courseDetails',
        exact: true,
        pageTitle: "CourseDetails",
        component: CourseDetails
    },
    {
        path: "/delivery",
        name: 'delivery',
        exact: true,
        pageTitle: "Delivery",
        component: Delivery
    },
    {
        path: "/passangers",
        name: 'passangers',
        exact: true,
        pageTitle: "Passangers",
        component: Passangers
    },
    // {
    //     path: "/schedule",
    //     name: 'schedule',
    //     exact: true,
    //     pageTitle: "Schedule",
    //     component: Schedule
    // },
    {
        path: "/trains",
        name: 'trains',
        exact: true,
        pageTitle: "trains",
        component: Trains
    },
    {
        path: "/",
        name: 'dashboard',
        exact: true,
        pageTitle: "Dashboard",
        component: Dashboard
    },
    {
        path: "/login",
        name: 'login',
        exact: true,
        pageTitle: "Tables",
        component: Login
    },
    {
        path: "/signup",
        name: 'signup',
        exact: true,
        pageTitle: "Tables",
        component: Signup
    },
    {
        path: "/forgotpassword",
        name: 'forgotpassword',
        exact: true,
        pageTitle: "Tables",
        component: ForgotPassword
    },
    {
        path: "/notfound",
        name: 'notfound',
        exact: true,
        pageTitle: "Tables",
        component: NotFound
    },
    {
        path: "/internalserver",
        name: 'internalserver',
        exact: true,
        pageTitle: "Tables",
        component: InternalServer
    }
];

export default Routes;