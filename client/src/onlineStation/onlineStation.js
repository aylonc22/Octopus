import React from 'react'
import './onlineStation.css'

const noOnlineStation =( 
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 120 120" enableBackground="new 0 0 120 120">
  <defs>
    <clipPath id="circle-clip">
      <path className="clip" d="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z">
        <animate id="morph-one" dur="1" begin="0" repeatCount="indefinite" attributeName="d" from="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" to="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" values="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z;M101.807,135.303c10-0.352,18.193-6.531,18.193-6.531V0H0v128.771c0,0,9.701,4.952,17.069,4.952s10.464-9.299,20.877-9.299
	c10.175,0,12.703,9.299,22.053,9.299s11.981-9.123,20.578-9.123S91.807,135.654,101.807,135.303z
;M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
	c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" />

      </path>
    </clipPath>
  </defs>
  <g clipPath="url(#circle-clip)">
    <path className="logo" d="M84.995 62.896h-5.788v3.061h5.788c1.037 0 1.68-0.611 1.68-1.512C86.675 63.582 86.032 62.896 84.995 62.896zM86.211 55.411c0-0.828-0.68-1.368-1.43-1.368h-5.574v2.808h5.574C85.531 56.85 86.211 56.274 86.211 55.411zM60 0C26.863 0 0 26.863 0 60c0 33.138 26.863 60 60 60 33.138 0 60-26.862 60-60C120 26.863 93.138 0 60 0zM48.974 72.004h-7.217v-9.178h-8.54v9.178H26V47.996h7.217v8.495h8.54v-8.495h7.217V72.004zM69.094 72.004H52.836V47.996h7.218v17.672h9.04V72.004zM86.962 72.004H71.99V47.996h14.471c4.931 0 7.075 3.312 7.075 6.119 0 2.987-1.752 5.003-4.074 5.507C92.035 60.018 94 62.393 94 65.488 94 68.836 91.749 72.004 86.962 72.004z"
    />
  </g>
</svg>);

const OnlineStation = (props) => {
    if(props.items.length===0)
        return(<div className ="noOnlineStation">
              <div className = "animation">{noOnlineStation} </div>
              </div>);
    let array = props.items.map(item => {
        return (
            <div key = {item.id} className = "containerOnline">
            <label className = "stationNameOnline">{item.id}</label>
                <div className = "dataContainer">
                    <div className = "row">
                        <label className = "right">ג</label>
                        <label className = "left">{item.message}</label>
                    </div>
                    <div className = "row">
                        <label className = "right">ע</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">I</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">מ</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">ת</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">מ</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">1</label>
                        <label className = "left">1</label>
                    </div>
                    <div className = "row">
                        <label className = "right">מ</label>
                        <label className = "left">1</label>
                    </div>  
                </div>
            </div>
        )
    })
    
    return(
        <div>
            <h1 className =  "textCenter">תחנות דולקות</h1>
            <div className = "boxOnline">{array}</div>
        </div>
    )
}
export default OnlineStation;