import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import {LinkList, LinkItem, UserAvatar, Button} from "../../../../components";
import { useTheme, useThemeUpdate } from "../../../provider/Theme";
import {logout} from "../../../../utils/api/auth";
import {APICore} from "../../../../utils/api/APICore";
import {useNavigate} from "react-router-dom";
import {role} from "../../../../utils/Utils";

const User = () => {
    const api = new APICore()
    const user = api.getLoggedInUser()
    const theme = useTheme();
    const themeUpdate = useThemeUpdate();
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prevState) => !prevState);
    const navigate = useNavigate();

    return (
        <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
            <DropdownToggle
                tag="a"
                href="#toggle"
                className="dropdown-toggle"
                onClick={(ev) => {
                    ev.preventDefault();
                }}
            >
                <div className="user-toggle">
                    <UserAvatar icon="user-alt" className="sm" />
                    <div className="user-info d-none d-md-block">
                        <div className="user-status">{role(user.role)}</div>
                        <div className="user-name dropdown-indicator">{user.name}</div>
                    </div>
                </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
                <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card sm">
                        <div className="user-avatar">
                            <span>AB</span>
                        </div>
                        <div className="user-info">
                            <span className="lead-text">{user.name}</span>
                            <span className="sub-text">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
                            View Profile
                        </LinkItem>
                        <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
                            Account Setting
                        </LinkItem>
                        <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
                            Login Activity
                        </LinkItem>
                        <li>
                            <a className={`dark-switch ${theme.skin === 'dark' ? 'active' : ''}`} href="#"
                               onClick={(ev) => {
                                   ev.preventDefault();
                                   themeUpdate.skin(theme.skin === 'dark' ? 'light' : 'dark');
                               }}>
                                {theme.skin === 'dark' ?
                                    <><em className="icon ni ni-sun"></em><span>Light Mode</span></>
                                    :
                                    <><em className="icon ni ni-moon"></em><span>Dark Mode</span></>
                                }
                            </a>
                        </li>
                    </LinkList>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <LinkItem link="#" icon="signout" onClick={() => {
                            logout({username: user.username}).then(() => {
                                navigate("/");
                            })
                        }}>Keluar</LinkItem>
                    </LinkList>
                </div>
            </DropdownMenu>
        </Dropdown>
    );
};

export default User;
