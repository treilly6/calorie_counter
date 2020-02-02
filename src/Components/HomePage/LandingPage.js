import React from 'react';
import photo1 from '../../images/food-image-1.jpg';
import photo3 from '../../images/food-image-3.jpg';
import './LandingPage.css';

export default function LandingPage() {
    return(
        <div>
            <div className="lp-main-photo">
                <img src={photo1} className="img-lp" />
                <div className="signup-modal">
                    <div>
                        <div style={{fontSize : "5em"}}>Count Calories,</div>
                        <div style={{fontSize : "5em"}}>Achieve Goals</div>
                        <div className="signup-text">Start your fitness journey</div>
                    </div>
                </div>
                <div className="shader"></div>
            </div>
            <div className="lp-main-photo">
                <img src={photo3} className="img-lp" />
                <div className="signup-modal">
                    <div>
                        <div style={{fontSize : "5em"}}>Track Progress & Take Control of Your Diet</div>
                    </div>
                </div>
                <div className="shader"></div>
            </div>
        </div>

    )
}
