import React, {useEffect, useState} from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import {Icon} from "../../../../components";
import {echo} from "../../../../utils/echo"
import {APICore} from "../../../../utils/api/APICore";
import {get as getNotification} from "../../../../utils/api/notification"

const NotificationItem = (props) => {
    const { icon, iconStyle, text, time, id } = props;
    return (
        <div className="nk-notification-item" key={id} id={id}>
            <div className="nk-notification-icon">
                <Icon name={icon} className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]} />
            </div>
            <div className="nk-notification-content">
                <div className="nk-notification-text">{text}</div>
                <div className="nk-notification-time">{time}</div>
            </div>
        </div>
    );
};

const Notification = () => {
    const api = new APICore()
    const user = api.getLoggedInUser()
    const [data, setData] = useState([]);
    const [countUnread, setCountUnread] = useState(0);
    useEffect(() => {
        getNotification().then((resp) => setData(resp))
    }, [])
    useEffect(() => {
        const PrivateChannel = echo.private(`notifications.${user.id}`);
        PrivateChannel.listen('.NotificationEvent', (resp) => {
            const unRead =resp.data.filter((i) => {
                return i.read === 0;
            })
            setCountUnread(unRead.length);
            setData(resp.data);
        })

        return () => {
            PrivateChannel.stopListening('.NotificationEvent');
        }
    }, [user.id]);
    return (
        <UncontrolledDropdown className="user-dropdown">
            <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
                {countUnread > 0 ? (
                    <div className="icon-status icon-status-info">
                        <Icon name="bell" />
                    </div>
                    ) : ( <Icon name="bell" /> )}
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl dropdown-menu-s1">
                <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">Notifikasi</span>
                    <a href={"#markasread"} onClick={(ev) => ev.preventDefault()}>
                        Tandai Terbaca Semua
                    </a>
                </div>
                <div className="dropdown-body">
                    <div className="nk-notification">
                        {data.map((item) => {
                            return (
                                <NotificationItem
                                    key={item.id}
                                    id={item.id}
                                    icon={item.icon}
                                    iconStyle={item.iconStyle}
                                    text={item.message}
                                    time={item.time}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="dropdown-foot center">
                    <a href={`${import.meta.env.VITE_BASE_URL}/notifikasi`}>Lihat Semua</a>
                </div>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default Notification;
