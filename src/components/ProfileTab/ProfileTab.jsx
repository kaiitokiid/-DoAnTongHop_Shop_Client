import React from 'react';
import './ProfileTab.css';

function ProfileTab(props) {
    const { profileTab } = props;

    return (
        <div className="profileTab">
            <div className="profileTab__title">
                {profileTab.title}
            </div>
            { profileTab.items.map((item, index) => {
                return (
                    <div key={index} className="profileTab__item">
                        <span className="profileTab__item-name">{item.name}</span>
                        <span className="profileTab__item-value">{item.value}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default ProfileTab;