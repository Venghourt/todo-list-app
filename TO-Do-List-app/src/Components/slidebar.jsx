import { Link } from 'react-router-dom';
import { useState } from "react";
import "./slidebar.css";  
import { profile, navItems1, navItems2, navItems3 } from "../data";
import Chevron_left from "../assets/arrow_back_ios_new_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import DownIcon from "../assets/down.png";
import PlusIcon from "../assets/plus.png";
import EditIcon from "../assets/edit.png"; // Import an edit icon

function Sidebar() {
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNav2Open, setIsNav2Open] = useState(true);
    const [isNav3Open, setIsNav3Open] = useState(true);
    const [nav2Items, setNav2Items] = useState(navItems2);
    const [nav3Items, setNav3Items] = useState(navItems3);
    const [showRenameDialog, setShowRenameDialog] = useState(false);
    const [itemToRename, setItemToRename] = useState(null);
    const [newItemName, setNewItemName] = useState("");
    const [setItemsFunction, setSetItemsFunction] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleNav2 = () => {
        setIsNav2Open(!isNav2Open);
    };

    const toggleNav3 = () => {
        setIsNav3Open(!isNav3Open);
    };

    const addNavItem = (setNavItems, defaultIcon) => {
        const newItem = { 
            name: "New Project", 
            icon: defaultIcon,
            link: `/project-${Date.now()}` // Add unique link
        };
        setNavItems(prevItems => [...prevItems, newItem]);
    };

    const handleEditClick = (item, setItems) => {
        setItemToRename(item);
        setNewItemName(item.name);
        setSetItemsFunction(() => setItems);
        setShowRenameDialog(true);
    };

    const handleRenameConfirm = () => {
        if (newItemName && itemToRename && setItemsFunction) {
            setItemsFunction(prevItems => 
                prevItems.map(item => 
                    item === itemToRename ? { ...item, name: newItemName } : item
                )
            );
            setShowRenameDialog(false);
        }
    };

    const handleRenameCancel = () => {
        setShowRenameDialog(false);
        setItemToRename(null);
        setNewItemName("");
    };

    return (
        <>
            {/* Rename Dialog */}
            {showRenameDialog && (
                <div className="rename-dialog-overlay">
                    <div className="rename-dialog">
                        <h3 className="dialog-title">Rename</h3>
                        <p className="dialog-instruction">Please enter a new name:</p>
                        <div className="current-name-preview">
                            <span className="current-name">{itemToRename?.name}</span>
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                className="rename-input"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="dialog-actions">
                            <button className="cancel-btn" onClick={handleRenameCancel}>Cancel</button>
                            <button className="confirm-btn" onClick={handleRenameConfirm}>OK</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`sidebar ${isSidebarOpen ? '' : 'hidden'}`}> 
                <div className="sidebar-header">
                    <Link to="/" className="header-logo">
                        <img src={profile} alt="Profile" />
                    </Link>
                    <button className="sidebar-toggler" onClick={toggleSidebar}>
                        <img src={Chevron_left} alt="Toggle sidebar" className="chevron-icon" />
                    </button>
                </div>
                
                <div className="sidebar-nav">
                    {/* Primary Navigation */}
                    <ul className="nav-list primary-nav">
                        {navItems1.map((item) => (
                            <li className="nav-items" key={item.name}>
                                <Link to={item.link} className="nav-link">
                                    <img src={item.icon} alt={`${item.name} Icon`} className="nav-icon" />
                                    <span className="nav-label">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Projects Section */}
                    <div className="nav-section">
                        <div 
                            className="My-Project"
                            onClick={toggleNav2}
                            onMouseEnter={() => setHoveredMenu('navItems2')}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >
                            <span className="my-projects-label">My Projects</span>
                            <div className="icons">
                                <img 
                                    src={DownIcon} 
                                    alt="Toggle projects" 
                                    className={`icon-down ${isNav2Open ? 'expanded' : 'collapsed'}`} 
                                />
                                {hoveredMenu === 'navItems2' && (
                                    <img 
                                        src={PlusIcon} 
                                        alt="Add project" 
                                        className="icon-plus" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addNavItem(setNav2Items, navItems2[0]?.icon);
                                        }} 
                                    />
                                )}
                            </div>
                        </div>
                        {isNav2Open && (
                            <ul className="nav-list">
                                {nav2Items.map((item) => (
                                    <li 
                                        className="nav-items" 
                                        key={item.name}
                                        onMouseEnter={() => setHoveredItem(item.name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <Link to={item.link} className="nav-link">
                                            <img src={item.icon} alt="" className="nav-icon" />
                                            <span className="nav-label">{item.name}</span>
                                        </Link>
                                        {hoveredItem === item.name && (
                                            <img 
                                                src={EditIcon} 
                                                alt="Edit" 
                                                className="icon-edit" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(item, setNav2Items);
                                                }} 
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Tags Section */}
                    <div className="nav-section">
                        <div 
                            className="My-Project"
                            onClick={toggleNav3}
                            onMouseEnter={() => setHoveredMenu('navItems3')}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >
                            <span className="my-projects-label">My Tags</span>
                            <div className="icons">
                                <img 
                                    src={DownIcon} 
                                    alt="Toggle tags" 
                                    className={`icon-down ${isNav3Open ? 'expanded' : 'collapsed'}`} 
                                />
                                {hoveredMenu === 'navItems3' && (
                                    <img 
                                        src={PlusIcon} 
                                        alt="Add tag" 
                                        className="icon-plus" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addNavItem(setNav3Items, navItems3[0]?.icon);
                                        }} 
                                    />
                                )}
                            </div>
                        </div>
                        {isNav3Open && (
                            <ul className="nav-list">
                                {nav3Items.map((item) => (
                                    <li 
                                        className="nav-items" 
                                        key={item.name}
                                        onMouseEnter={() => setHoveredItem(item.name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <Link to={item.link} className="nav-link">
                                            <img src={item.icon} alt="" className="nav-icon" />
                                            <span className="nav-label">{item.name}</span>
                                        </Link>
                                        {hoveredItem === item.name && (
                                            <img 
                                                src={EditIcon} 
                                                alt="Edit" 
                                                className="icon-edit" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(item, setNav3Items);
                                                }} 
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;