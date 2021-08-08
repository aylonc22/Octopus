import {React,useEffect} from 'react';
import {TweenMax,Power1,Power3} from 'gsap';
import './NotFoundPage.css';

const NotFoundPage = (props)=>{
  
  const Image = (<svg className ="PageNotFound-SVG" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1226.887 908">
  <g id="water">
   <path id="leftWater" fill="#00B6FF" d="M1226.887,908H1887V330.333c0,0-17.78-23.951-43.113-23.951s-50.667,32.724-144.667,32.724
       s-99.333-32.724-177.333-32.724s-76.667,32.724-172,32.724s-166.77-31.173-218.174-31.173c-73.012,0-73.012,33.725-146.023,33.725
       c-73.008,0-73.008-33.725-146.012-33.725c-73.011,0-73.011,33.725-146.019,33.725c-73.005,0-73.005-33.725-146.003-33.725
       c-73.006,0-73.006,33.725-146.016,33.725c-73.008,0-73.008-33.725-146.012-33.725c-73.001,0-73.001,33.725-146.005,33.725
       c-57.429,0-71.001-22.575-109.622-30.845c0,0-0.113-4.957-45.113-4.385s-83,24.505-129,26.572s-64.812-6.149-116.033-9.751
       c-49.875-3.507-64.967-15.889-134.967-16.821s-237,55.572-237,55.572l2,547H0L1226.887,908z" />
   <path id="rightWater" opacity="0.7" fill="#00B6FF" d="M1887,908V607.943V307.886c-27.059,3.017-42.916,10.22-60.79,16.67
       s-37.766,12.146-72.893,12.146c-40.485,0-60.728-7.568-80.971-15.138c-20.243-7.568-40.486-15.137-80.973-15.137
       c-40.483,0-60.725,7.568-80.968,15.137c-20.242,7.569-40.485,15.138-80.971,15.138c-40.484,0-60.726-7.568-80.967-15.138
       c-20.241-7.568-40.482-15.137-80.963-15.137c-40.486,0-60.729,7.568-80.971,15.137c-20.243,7.569-40.485,15.138-80.97,15.138
       c-40.486,0-60.729-7.568-80.972-15.138c-20.242-7.568-40.483-15.137-80.967-15.137c-40.482,0-60.724,7.568-80.966,15.137
       c-20.242,7.569-40.483,15.138-80.968,15.138c-31.848,0-72.604-26.805-121.579-27.69s-54.279,6.633-78.847,11.038
       c-44.312,7.945-66.016,18.911-103.266,19.056s-83.045-30.716-137.045-29.648S228.299,337,185.887,337
       c-42,0-106.792-29.067-158.5-29.067c-32.333,0-109,31.173-188,31.173s-75-32.724-158.5-32.724s-92.5,32.724-184.5,32.724
       s-158.5-32.724-158.5-32.724l1.984,604.087L660.113,909l613.444-1H1887z" />
  </g>
  <g id="squidBack">
   <path id="tent1" fill="#005FB8" d="M432.199,644.237c0,0,1.444,0.534,4.153,1.536c36.663,17.052,47.713,53.916,38.136,80.266
       c-0.885,2.635,0.001,0.119-7.069,19.606c-8.573,23.632-4.604,12.438-24.73,69.645c-2.028,5.766-4.04,11.485-6.028,17.137
       c-3.471,9.87-13.107,34.064-11.154,62.421c0.298,4.38,0.888,8.789,1.758,13.152h82.876c-0.581-0.31-1.167-0.612-1.733-0.943
       c-1.711-1.018-3.317-2.133-4.805-3.312c-20.484-16.15-0.4-71.467-0.652-70.467c2.937-11.676,5.919-23.535,8.903-35.396
       c13.658-53.723,16.46-59.657,17.403-75.706c0.936-14.937-1.134-29.403-5.257-42.254c-6.648-21.014-19.66-40.621-39.378-55.898
       c-12.336-9.366-25.246-15.318-39.856-19.242c-10.208-2.706-21.08,2.722-24.817,12.828
       C415.977,628.345,421.462,640.267,432.199,644.237z" />
   <path id="tent2"  fill="#005FB8" d="M698.706,908h72.34c-1.096-0.779-2.206-1.641-3.331-2.599c-3.384-2.985-6.706-6.95-9.616-11.765
       c-12.827-22.479-4.942-43.119-0.125-64.463c2.116-9.53,5.021-21.135,6.943-28.909c8.716-34.801,18.933-57.854,6.827-90.303
       c-6.408-17.491-18.544-34.052-36.326-46.753c-0.493-0.351-0.748-0.532-0.748-0.532c-7.43-5.265-17.812-3.919-23.585,3.278
       c-5.994,7.472-4.796,18.388,2.675,24.382l0.591,0.475c0,0,0.244,0.195,0.716,0.574c14.119,11.318,23.536,29.184,21.693,47.66
       c-0.713,7.543-1.618,8.415-16.222,47.066c-20.226,54.427-27.044,67.854-26.043,94.698C694.838,890.285,696.331,899.419,698.706,908
       z" />
  </g>
  <g id="squidFront">
   <path id="tent3"  fill="#2D3965" d="M644.99,730.776c0.595,1.157,1.192,2.271,1.83,3.323c6.461,10.951,11.392,16.271,17.344,22.202
       c6.868,6.811,17.979,7.189,25.26,0.64c7.546-6.789,8.161-18.41,1.372-25.956c0,0-0.402-0.447-1.183-1.314
       c-16.246-18.078-20.826-44.066-10.578-67.113c10.79-23.356,34.057-36.631,57.678-35.07c35.636,1.978,59.734,35.494,52.137,68.086
       c-4.876,21.281-10.381,21.927-79.792,86.332c-19.512,18.122-28.601,25.433-40.788,45.235c-1.229,2.223-2.474,4.358-3.563,6.674
       c-10.297,20.577-13.039,45.029-4.896,69.393c0.556,1.662,1.143,3.253,1.746,4.793h84.269c-1.585-2.688-3.545-5.213-5.897-7.487
       l-0.489-0.472c-19.034-18.422-23.844-33.269-4.432-54.468c46.325-50.523,81.968-79.772,95.599-103.887
       c12.249-21.862,17.11-48.022,12.09-74.304c-9.789-50.995-54.321-87.492-104.955-87.36
       c-61.184-0.297-110.777,52.717-103.774,114.993C635.625,709.523,640.12,721.613,644.99,730.776z" />
   <path id="tent4"  fill="#2D3965" d="M660.793,908c2.253-7.773,3.738-15.787,4.461-23.756c1.413-15.434,0.156-27.82-2.252-42.207
       c-2.122-13.193-7.265-27.879-10.179-36.745c-2.408-7.325-4.846-14.741-7.303-22.215c-4.912-14.938-9.902-30.112-14.893-45.287
       c-22.985-69.287-22.439-65.345-24.909-75.007c-3.308-13.814-3.245-27.866-0.034-41.389c6.995-30.237,29.952-55.992,62.892-67.404
       c8.504-2.938,13.787-11.751,12.042-20.846c-1.913-9.979-11.553-16.517-21.531-14.604l-0.584,0.111
       c-33.272,6.387-60.368,23.244-79.792,46.13c-9.368,11.052-18.096,24.585-24.294,40.48c-6.248,15.835-10.077,33.979-10.106,53.095
       c-0.106,19.916,2.797,27.117,15.55,98.894c2.719,15.55,5.438,31.1,8.114,46.406c1.336,7.645,2.662,15.229,3.972,22.721
       c5.611,32.11,7.223,52.174-15.813,61.501c-22.003,8.724-36.428,2.564-55.607,20.121H660.793z" />
   <path id="tent5" fill="#2D3965" d="M379.528,740.987c31.41,31.916,17.937,18.077,59.572,61.208c6.335,6.562,12.564,13.014,18.661,19.329
       c13.024,13.485,35.26,33.938,33.978,57.603c-0.209,3.458-0.875,6.712-1.907,9.881c-2.295,7.052-5.856,12.384-9.219,17.11
       c-0.487,0.647-0.971,1.272-1.451,1.882h75.496c0.107-0.404,0.221-0.8,0.325-1.209c2.114-8.326,3.421-17.719,3.261-27.648
       c-0.156-9.925-1.917-20.271-5.093-30.196c-13.417-41.985-55.82-74.435-92.669-108.668c-19.715-18.321-10.236-9.61-42.628-39.146
       c-11.349-10.349-29.472-25.52-32.859-57.594c-4.255-43.684,26.915-81.023,67.837-88.431c25.528-4.499,51.999,2.554,72.586,21.087
       c0.881,0.793,1.336,1.203,1.336,1.203c7.206,6.462,18.331,6.277,25.272-0.641c7.19-7.165,7.21-18.802,0.044-25.992
       c-37.368-37.493-87.944-46.48-131.987-31.007c-50.09,17.689-87.94,66.966-85.534,126.883
       C336.678,688.176,354.184,715.236,379.528,740.987z" />
  </g>
  <g id="bubbles">
   <circle fill="#00AEF7" cx="623.879" cy="408.974" r="4.913" />
   <circle fill="#00AEF7" cx="545.501" cy="747.773" r="4.913" />
   <circle fill="#00AEF7" cx="592.4" cy="627.177" r="7.37" />
   <circle fill="#00AEF7" cx="504.856" cy="602.164" r="7.37" />
   <circle fill="#006FCF" cx="530.887" cy="614.999" r="5.527" />
   <circle fill="#006FCF" cx="686.885" cy="504.999" r="3.825" />
   <circle fill="#FFFFFF" cx="622.773" cy="795.12" r="3.685" />
   <circle fill="#006FCF" cx="472.697" cy="527.126" r="3.685" />
  </g>
  <g id="bubbles2">
   <path fill="#006FCF" d="M647.786,752.464c-2.035,0-3.685-1.65-3.685-3.686C644.101,738.023,658.502,752.464,647.786,752.464z" />
   <circle fill="#006FCF" cx="722.824" cy="556.717" r="3.685" />
   <circle fill="#006FCF" cx="610.195" cy="430.975" r="3.685" />
   <circle fill="#FFFFFF" cx="449.917" cy="538.738" r="6.142" />
   <circle fill="#FFFFFF" cx="616.746" cy="470" r="6.142" />
   <circle fill="#FFFFFF" cx="585.701" cy="684.795" r="8.061" />
   <circle fill="#FFFFFF" cx="640.192" cy="818.792" r="8.061" />
  </g>
  <g id="bottle">
   <path fill="#FFFFFF" d="M589.59,332.821c6.882,1.926,13.794,3.701,20.812,5.024c4.953,0.352,9.882,0.345,14.836-0.011
       c1.066-0.204,2.126-0.431,3.187-0.659c5.371-10.27,9.474-18.127,9.509-18.232l0.093-0.027c8.667-16.526-5.036-10.668,5.175-32.325
       l10.401-19.835l-13.808-7.24l-10.467,19.961c-11.961,20.557-14.931,6.019-23.58,22.513l0.029,0.092
       C605.686,302.203,597.821,317.157,589.59,332.821z" />

   <rect x="641.23" y="254.555" transform="matrix(0.8856 0.4644 -0.4644 0.8856 196.4175 -269.9889)" fill="#C7A66F" width="10.258" height="18.461" />
   <path fill="#FFFFFF" d="M653.436,273.045c-0.365,0.695-1.232,0.967-1.927,0.602l-16.188-8.488
       c-0.695-0.365-0.966-1.232-0.602-1.928l2.083-3.972c0.365-0.695,1.232-0.966,1.927-0.601l16.188,8.489
       c0.695,0.364,0.966,1.23,0.602,1.926L653.436,273.045z" />
   <path fill="#005FB8" d="M579.017,352.949c-4.666,8.884-8.058,15.347-8.058,15.347c-1.54,2.937-0.408,6.566,2.529,8.106
       l21.672,11.364c2.937,1.54,6.566,0.408,8.106-2.529c0,0,9.991-19.073,19.247-36.759
       C608.212,351.517,593.521,353.153,579.017,352.949z" />
  </g>
  {!props.numbers?<g id="numbers">
   <path fill="#FFFFFF" d="M571.062,450.443l-2.667-5.084l2.156-17.892l6.726-3.528l7.123,13.576l2.449-1.284l2.406,4.587
       l-2.448,1.285l2.179,4.154l-6.043,3.17l-2.147-4.091L571.062,450.443z M578.76,440.555l-3.14-5.982
       c-0.113-0.218-0.229-0.513-0.497-1.4c-0.217-0.716-0.42-1.479-0.528-2.213c0.044,0.688,0.075,1.424,0.061,2.301l-0.001,0.751
       l-0.025,0.251l-0.767,8.862L578.76,440.555z" />
   <path fill="#006FCF" d="M594.011,506.102c0.185-0.711,0.411-1.449,0.63-2.151c2.141-6.315,5.303-8.751,10.062-8.423
       c7.289,0.477,10.628,5.32,9.15,13.397c-0.276,1.484-0.645,2.906-1.114,4.304c-2.654,7.737-7.898,10.394-14.502,7.273
       c-4.313-2.057-5.904-5.687-4.719-12.215C593.677,507.533,593.827,506.812,594.011,506.102z M600.506,509.085
       c-0.353,1.644-0.47,2.373-0.544,3.077c-0.264,3.114,0.736,4.42,2.512,4.266c0.96-0.077,1.807-0.833,2.741-2.906
       c0.277-0.65,0.529-1.346,1.018-2.954c0.288-0.829,0.489-1.608,0.632-2.44c0.354-1.644,0.471-2.373,0.544-3.076
       c0.244-2.758-0.418-3.832-1.739-4.175c-1.288-0.333-2.388,0.285-3.514,2.814c-0.276,0.651-0.528,1.345-1.018,2.954
       c-0.139,0.398-0.244,0.805-0.35,1.211C600.684,508.262,600.578,508.669,600.506,509.085z" />
   <path fill="#006FCF" d="M623.107,608.756l1.129-5.63l12.941-12.54l7.447,1.494l-3.016,15.032l2.71,0.544l-1.019,5.079
       l-2.711-0.544l-0.923,4.6l-6.692-1.344l0.909-4.529L623.107,608.756z M635.314,605.922l1.33-6.625
       c0.048-0.239,0.144-0.542,0.495-1.399c0.282-0.692,0.604-1.414,0.983-2.053c-0.398,0.564-0.838,1.154-1.402,1.826l-0.474,0.583
       l-0.179,0.178l-6.176,6.401L635.314,605.922z" />
  </g>:null}
  </svg>);

    // some nice facts to show in octopus page
  const facts = [
  "המלחמה היחידה בה צנחו חיילים הייתה בשנת 1956 במבצע קדש",
  "צהל הוא הצבא היחיד בעולם בו חל גיוס חובה לנשים וגברים כאחד",
  "עם הקמת צהל, בימיה הראשונים של המדינה, גיל הגיוס לצבא היה 12",
  "מקצועו של הרמטכל השני, יגאל ידין, היה ארכיאולוג",
    "מעצב הסמל של צהל הוא האדריכל אריה אלחנני, שגם היה חתן פרס ישראל",
    "צבע הכומתה של חיל השריון נלקח מהצבא הבריטי",
    "בתחילת דרכו של צהל הוקמו 12 יחידות לוחמות, מה שמזכיר את 12 השבטים מהתנך",
    "כומתת התותחנים היא הכומתה היחידה מכל צבעי כומתות צהל שנבחרה לפי הצבעתם של הקצינים והחיילים המשרתים בחיל",
    "בחיל הים ישנה אמונה טפלה שעל פיה אסור לשרוק בים",
    "דוד דניאל (מיקי) מרכוס היה האלוף הראשון של צהל",
    "צהל נחשב לצבא החזק ביותר במזרח התיכון",
    "בנוסף לתפקידי הלחימה, המודיעין והים אפשר למצוא גם תפקידים כמו קוסם צבאי וקורא מחשבות צבאי",
    "צהל הוא הצבא הראשון שהוקם בו חיל חינוך",
    "פעם היה חייל המדע אבל הוא פורק והועבר לחברות שונות כמו התעשייה האווירית והרשות לפיתוח אמצעי לחימה",
    "רוב חברי להקת כוורת הגיעו מלהקת הנחל",
    "כמעט כל בעלי החיים בצהל מקבלים אוכל כשר לפסח",
    "שריונרים אינם לובשים מדים בטנק אלא סרבלים",
    "האגף שהחליף את שמו הכי הרבה פעמים בצבא הוא אגף הטכנולוגיה והלוגיסטיקה",
    "צהל מגייס לשורותיו גם לאמות ואלפקות",
    "עם הקמתו של חיל השריון היו בו בסך הכל שמונה טנקים, רובם נגנבו מהצבא הבריטי",
  ];


    useEffect(()=>{
        TweenMax.to("#h1", 1, {
            alpha: 1,
            y: 20,
            yoyo: true,
            ease: Power3.easeInOut
          });
          
          TweenMax.staggerTo(
            "#water path",
            2,
            {
              x: "+=10",
              y: "+=5",
              repeat: -1,
              yoyo: true,
              ease: Power3.easeInOut
            },
            1
          );
          
          TweenMax.to(
            "#bottle",
            3,
            {
              x: "+=30",
              y: "+=5",
              rotation: "+=7",
              repeat: -1,
              yoyo: true,
              ease: Power1.easeInOut
            },
            2
          );
          
          TweenMax.staggerTo(
            "#numbers path",
            4,
            {
              rotation: -30,
              skewY: "10deg",
              x: "+=10",
              y: "+=5",
              repeat: -1,
              yoyo: true,
              ease: Power1.easeInOut
            },
            "-=5"
          );
          
          TweenMax.staggerTo(
            "#bubbles circle",
            4,
            {
              x: "+=1",
              y: "+=80",
              repeat: -1,
              yoyo: true,
              ease: Power1.easeInOut
            },
            "-=5"
          );
          
          TweenMax.staggerTo(
            "#bubbles2 circle",
            3,
            {
              x: "+=10",
              y: "+=40",
              repeat: -1,
              yoyo: true,
              ease: Power1.easeInOut
            },
            "-=5"
          );
          
          TweenMax.to("#tent5", 4, {
            morphSVG:
              "M450.156,820.511l0.395,0.462c34.244,40.2,30.831,65.406,18.13,86.909 c-0.001,0.002-0.003,0.005-0.004,0.007h84.433c0.009-0.056,0.019-0.106,0.028-0.162c1.949-11.366,3.12-25.264,1.164-36.695 c-2.091-14.146-8.913-35.893-26.464-64.532c-14.815-22.431-21.191-29.198-66.652-72.601c-61-57.914-54.765-51.116-61.914-61.358 c-16.548-25.645-15.705-60.353,4.333-87.092c15.819-21.144,34.798-28.843,56.219-33.275c8.384-1.736,14.551-9.302,14.253-18.149 c-0.333-9.89-8.622-17.638-18.513-17.304c-33.573,1.164-62.735,12.935-86.354,36.629c-23.05,23.077-36.875,54.064-36.968,91.268 c0.14,29.981,10.858,60.685,34.242,86.519C392.059,759.365,426.772,794.55,450.156,820.511z",
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
          });
          
          TweenMax.to("#tent4", 3, {
            morphSVG:
              "M678.762,908c-7.375-7-10.719-9.452-10.704-18.699c0.039-17.91-1.99-31.691-5.165-47.461 c-2.837-14.484-8.394-29.914-11.583-39.278c-2.635-7.736-5.304-15.567-7.993-23.46c-5.376-15.775-10.838-31.801-16.299-47.826 c-25.11-73.119-24.338-68.769-27.206-79.148c-3.907-14.896-4.926-30.899-3.19-47.083c3.722-36.142,5.271-50.405,20.125-84.377 c6.7-16.029,8.475-17.166,10.567-26.349c2.475-10.863-11.223-15.921-19.68-11.264l-0.496,0.271 c-28.2,15.537-36.074,47.484-40.917,61.554c-5.392,15.665-10.905,34.927-15.036,54.552c-4.177,19.57-6.094,41.165-4.659,62.923 c1.43,22.687,3.889,41.979,15.028,86.276c4.238,16.854,15.19,48.619,18.667,65.369c1.736,8.366,5.298,22.469,7,30.667 c7.291,35.14,13.001,42.575-8.396,55.833c-6.003,3.72-51.41-2.645-58.072,7.5H678.762z",
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
          });
          
          TweenMax.to("#tent1", 2, {
            morphSVG:
              "M405.637,642.917c0,0,2.25,1.084,4.5,2.583c38.333,21.834,61,53.5,60.75,80.167 c-0.228,2.635-0.039,5.346-2.25,24.833c-2.681,23.632-0.761,7.514-7.75,64.25c-0.708,5.752-1.671,13.099-2.25,18.75 c-1.01,9.87-5.218,31.077-7.968,45.077c-0.886,4.509-4.407,23.298-22.538,29.423h94.539c-0.658-0.31-2.571-1.919-3.22-2.25 c-1.964-1.018-1.257-5.26-1.562-7.375c-0.5-3.459,3.336-64.208,3.333-63.208c0.025-11.676,1.039-25.425,1.064-37.286 c0.264-53.723,1.586-59.657-1.473-75.706c-2.789-14.937-8.465-29.403-15.792-42.254c-11.888-21.014-29.788-40.621-53.315-55.898 c-14.672-9.366-29.065-15.318-44.653-19.242c-10.883-2.706-20.402,2.722-21.619,12.828 C384.138,628.345,395.996,637.312,405.637,642.917z",
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
          });
          
          TweenMax.to("#tent2", 5, {
            morphSVG:
              "M698.706,908h72.34c-1.096-0.779-2.206-1.641-3.331-2.599 c-3.384-2.985-6.706-6.95-9.616-11.765c-12.827-22.479-4.942-43.119-0.125-64.463c2.116-9.53,5.021-21.135,6.943-28.909 c8.716-34.801,11.304-55.468,14.971-90.264c1.952-18.525,4.916-45.252,1-52.168c-1.544-2.727-6.5-6.917-6.5-6.917 c-7.43-5.265-16.876-1.355-18.833,1.751c-4.542,7.208-3.5,9.083-5.333,19.5l-1.4,8.69c0,0-0.719,4.456-0.766,5.06 c-0.249,3.212-10.683,41.219-13.667,52.083c-1.867,6.797-3.533,10.019-15.75,47.5c-17.994,55.205-25.143,68.466-24.142,95.311 C694.838,890.285,696.331,899.419,698.706,908z",
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
          });
          
          TweenMax.to("#tent3", 3, {
            morphSVG:
              "M666.075,731.812c3.99,6.251,7.875,9.812,10,11.438c11.772,9.003,14.993,8.5,22.312,10.062 c12.938,1.625,18.401-0.703,17.167-7.646c-1.333-7.5-8.333-9.833-11.833-13c0,0-6.709-5.144-7.333-6 c-13.007-17.865-13.626-40.143-5.993-63.319c8.052-23.494,26.03-37.068,44.531-35.814c27.905,1.515,47.311,34.713,41.909,67.399 c-3.46,21.342-7.755,22.059-60.977,87.356c-14.96,18.373-20.292,25.379-29.22,40.961c-0.925,2.238-6.75,12.805-7.875,15 c-6.708,13.083-20.481,38.413-13.708,62.667c0.462,1.655,1.419,5.385,1.917,6.916l79.738,0.056 c-1.284-2.668-2.859-5.166-4.737-7.41l-0.39-0.465c-15.193-18.172-19.202-32.954-4.37-54.402 c35.395-51.118,62.788-80.826,73.049-105.114c9.218-22.019,12.586-48.238,8.223-74.45c-8.502-50.861-43.94-86.775-83.541-85.985 c-47.86,0.497-85.77,54.147-79.259,116.324C657.22,710.87,660.735,723.448,666.075,731.812z",
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
          });
    
    },[]);


    if(props.isOffline)
    return(<div className ="background full">
		<h1 id = "h1">השרת לא עובד יש לפנות למחלקת תחקור</h1>
    {Image}
</div>
    );
    else
    return(<div className ="background"><a href = "/">
	<h1 id = "h1">{!props.numbers?"Page not found.": facts[Math.floor(Math.random() * facts.length)]}</h1>
    {Image}
</a></div>
    );
};
export default NotFoundPage;