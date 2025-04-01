

import profile from "./assets/profile.png";
import search from "./assets/search.png";
import inbox from "./assets/inbox.png";
import calendar from "./assets/calendar.png";
import checkMark from "./assets/check-mark.png";
import filter from "./assets/filter.png";
import upcoming from "./assets/upcoming.png";
import Tags1 from "./assets/tag.png"

const navItems1 = [
    { name: "Search", icon: search , link: "/search"},
    { name: "Inbox", icon: inbox , link: "/notification" },
    { name: "Today", icon: calendar , link: "/calender" },
    { name: "Upcoming", icon: upcoming , link: "/upcoming"},
    { name: "Completed", icon: checkMark  ,link: "/complete"},
    { name: "Filters", icon: filter, link: "/filter" }
];

const navItems2 = [
    { name: "Tags1", icon: Tags1 },
    { name: "Tags2", icon: Tags1 },
    { name: "Tags3", icon: Tags1 }
];

const navItems3 = [
    { name: "Tags1", icon: Tags1 },
    { name: "Tags2", icon: Tags1 },
    { name: "Tags3", icon: Tags1 }
];




export { profile, navItems1 , navItems2 , navItems3};
