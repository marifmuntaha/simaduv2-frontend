import React, { useEffect, useState } from "react";
import menuDefault from "./MenuData";
import administratorMenu from "./administratorMenu";
import { NavLink, Link } from "react-router-dom";
import {Icon} from "../../components";
import classNames from "classnames";
import {APICore} from "../../utils/api/APICore.jsx";

const menu = () => {
    const api = new APICore()
    const user = api.getLoggedInUser()
    switch (user.role) {
        case '1':
            return administratorMenu;
        default:
            return  menuDefault;
    }
}
const MenuHeading = ({ heading }) => {
    return (
        <li className="nk-menu-heading">
            <h6 className="overline-title text-primary-alt">{heading}</h6>
        </li>
    );
};

const MenuItem = ({ icon, link, text, sub, subPanel, panel, newTab, mobileView, sidebarToggle, badge, ...props }) => {
    let currentUrl;

    const toggleActionSidebar = (e) => {
        if (!sub && !newTab && mobileView) {
            sidebarToggle(e);
        }
    };

    if (window.location.pathname !== undefined) {
        currentUrl = window.location.pathname;
    } else {
        currentUrl = null;
    }

    const menuHeight = (el) => {
        let totalHeight = [];
        for (let i = 0; i < el.length; i++) {
            let margin =
                parseInt(window.getComputedStyle(el[i]).marginTop.slice(0, -2)) +
                parseInt(window.getComputedStyle(el[i]).marginBottom.slice(0, -2));
            let padding =
                parseInt(window.getComputedStyle(el[i]).paddingTop.slice(0, -2)) +
                parseInt(window.getComputedStyle(el[i]).paddingBottom.slice(0, -2));
            let height = el[i].clientHeight + margin + padding;
            totalHeight.push(height);
        }
        totalHeight = totalHeight.reduce((sum, value) => (sum += value));
        return totalHeight;
    };

    const makeParentActive = (el, childHeight) => {
        let element = el.parentElement.parentElement.parentElement;
        let wrap = el.parentElement.parentElement;
        if (element.classList[0] === "nk-menu-item") {
            element.classList.add("active");
            const subMenuHeight = menuHeight(el.parentNode.children);
            wrap.style.height = subMenuHeight + childHeight - 50 + "px";
            makeParentActive(element);
        }
    };

    useEffect(() => {
        let element = document.getElementsByClassName("nk-menu-item active current-page");
        let arrayElement = [...element];

        arrayElement.forEach((dom) => {
            if (dom.parentElement.parentElement.parentElement.classList[0] === "nk-menu-item") {
                dom.parentElement.parentElement.parentElement.classList.add("active");
                const subMenuHeight = menuHeight(dom.parentNode.children);
                dom.parentElement.parentElement.style.height = subMenuHeight + "px";
                makeParentActive(dom.parentElement.parentElement.parentElement, subMenuHeight);
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const menuToggle = (e) => {
        e.preventDefault();
        let self = e.target.closest(".nk-menu-toggle");
        let parent = self.parentElement;
        let subMenu = self.nextSibling;
        let subMenuItem = subMenu.childNodes;
        let parentSiblings = parent.parentElement.childNodes;
        let parentMenu = parent.closest(".nk-menu-wrap");
        //For Sub Menu Height
        let subMenuHeight = menuHeight(subMenuItem);
        // Get parent elements
        const getParents = (el, parentSelector) => {
            parentSelector = document.querySelector(".nk-menu");
            if (parentSelector === undefined) {
                parentSelector = document;
            }
            let parents = [];
            let p = el.parentNode;
            while (p !== parentSelector) {
                let o = p;
                parents.push(o);
                p = o.parentNode;
            }
            parents.push(parentSelector);
            return parents;
        };
        let parentMenus = getParents(self);
        if (!parent.classList.contains("active")) {
            // For Parent Siblings
            for (let j = 0; j < parentSiblings.length; j++) {
                parentSiblings[j].classList.remove("active");
                if (typeof parentSiblings[j].childNodes[1] !== "undefined") {
                    parentSiblings[j].childNodes[1].style.height = 0;
                }
            }
            if (parentMenu !== null) {
                if (!parentMenu.classList.contains("sub-opened")) {
                    parentMenu.classList.add("sub-opened");

                    for (let l = 0; l < parentMenus.length; l++) {
                        if (typeof parentMenus !== "undefined") {
                            if (parentMenus[l].classList.contains("nk-menu-wrap")) {
                                parentMenus[l].style.height = subMenuHeight + parentMenus[l].clientHeight + "px";
                            }
                        }
                    }
                }
            }
            // For Current Element
            parent.classList.add("active");
            subMenu.style.height = subMenuHeight + "px";
        } else {
            parent.classList.remove("active");
            if (parentMenu !== null) {
                parentMenu.classList.remove("sub-opened");
                for (let k = 0; k < parentMenus.length; k++) {
                    if (typeof parentMenus !== "undefined") {
                        if (parentMenus[k].classList.contains("nk-menu-wrap")) {
                            parentMenus[k].style.height = parentMenus[k].clientHeight - subMenuHeight + "px";
                        }
                    }
                }
            }
            subMenu.style.height = 0;
        }
    };

    const menuItemClass = classNames({
        "nk-menu-item": true,
        "has-sub": sub,
        "active current-page": currentUrl === link,
    });
    return (
        <li className={menuItemClass} onClick={(e) => toggleActionSidebar(e)}>
            {newTab ? (
                <Link
                    to={`${import.meta.env.VITE_BASE_URL + link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nk-menu-link"
                >
                    {icon ? (
                        <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
                    ) : null}
                    <span className="nk-menu-text">{text}</span>
                </Link>
            ) : (
                <NavLink
                    to={link}
                    className={`nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
                    onClick={sub ? menuToggle : null}
                >
                    {icon ? (
                        <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
                    ) : null}
                    <span className="nk-menu-text">{text}</span>
                    {badge && <span className="nk-menu-badge">{badge}</span>}
                </NavLink>
            )}
            {sub ? (
                <div className="nk-menu-wrap">
                    <MenuSub sub={sub} sidebarToggle={sidebarToggle} mobileView={mobileView} />
                </div>
            ) : null}
        </li>
    );
};

const PanelItem = ({ icon, link, text, subPanel, index, data, setMenuData, ...props }) => {
    const menuItemClass = classNames({
        "nk-menu-item": true,
    });

    if (data === menu) {
        return (
            <li className={menuItemClass}>
                <Link
                    to={`${import.meta.env.VITE_BASE_URL}${link}`}
                    className="nk-menu-link"
                    onClick={() => setMenuData([menu[index]])}
                >
                    {icon ? (
                        <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
                    ) : null}
                    <span className="nk-menu-text">{text}</span>
                    <span className="nk-menu-badge">HOT</span>
                </Link>
            </li>
        );
    } else {
        return (
            <React.Fragment>
                {subPanel.map((item) => (
                    <MenuItem
                        key={item.text}
                        link={item.link}
                        icon={item.icon}
                        text={item.text}
                        sub={item.subMenu}
                        badge={item.badge}
                    />
                ))}
                <MenuHeading heading="Return to" />
                <li className={menuItemClass}>
                    <Link to={`${import.meta.env.VITE_BASE_URL}/`} className="nk-menu-link" onClick={() => setMenuData(menu)}>
            <span className="nk-menu-icon">
              <Icon name="dashlite-alt" />
            </span>
                        <span className="nk-menu-text">Main Dashboard</span>
                    </Link>
                </li>
                <li className={menuItemClass}>
                    <Link to={`${import.meta.env.VITE_BASE_URL}/`} className="nk-menu-link" onClick={() => setMenuData(menu)}>
            <span className="nk-menu-icon">
              <Icon name="layers-fill" />
            </span>
                        <span className="nk-menu-text">All Components</span>
                    </Link>
                </li>
            </React.Fragment>
        );
    }
};

const MenuSub = ({ icon, link, text, sub, sidebarToggle, mobileView, ...props }) => {
    return (
        <ul className="nk-menu-sub" style={props.style}>
            {sub.map((item) => (
                <MenuItem
                    link={item.link}
                    icon={item.icon}
                    text={item.text}
                    sub={item.subMenu}
                    key={item.text}
                    newTab={item.newTab}
                    badge={item.badge}
                    sidebarToggle={sidebarToggle}
                    mobileView={mobileView}
                />
            ))}
        </ul>
    );
};

const Menu = ({ sidebarToggle, mobileView }) => {
    const [data, setMenuData] = useState(menu);

    useEffect(() => {
        data.forEach((item, index) => {
            if (item.panel) {
                let found = item.subPanel.find((sPanel) => import.meta.env.VITE_BASE_URL + sPanel.link === window.location.pathname);
                if (found) {
                    setMenuData([menu[index]]);
                }
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ul className="nk-menu">
            {data.map((item, index) =>
                item.heading ? (
                    <MenuHeading heading={item.heading} key={item.heading} />
                ) : item.panel ? (
                    <PanelItem
                        key={item.text}
                        link={item.link}
                        icon={item.icon}
                        text={item.text}
                        index={index}
                        panel={item.panel}
                        subPanel={item.subPanel}
                        data={data}
                        setMenuData={setMenuData}
                        sidebarToggle={sidebarToggle}
                    />
                ) : (
                    <MenuItem
                        key={item.text}
                        link={item.link}
                        icon={item.icon}
                        text={item.text}
                        sub={item.subMenu}
                        badge={item.badge}
                        panel={item.panel}
                        subPanel={item.subPanel}
                        sidebarToggle={sidebarToggle}
                        mobileView={mobileView}
                    />
                )
            )}
        </ul>
    );
};

export default Menu;
