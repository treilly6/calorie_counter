import React from 'react';
import photo1 from '../../images/food-image-1.jpg';
import './LandingPage.css';

export default function LandingPage() {
    return(
        <div>
            <div className="lp-main-photo">
                <img src={photo1} />
            </div>            
        </div>

    )
}
