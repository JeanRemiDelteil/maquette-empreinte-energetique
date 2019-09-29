import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`<iron-iconset-svg name="app-icon" size="24">
<svg><defs>
	<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
	<g id="add"><path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 9h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3h-3c-.55 0-1-.45-1-1s.45-1 1-1h3V6c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/></g>
	<g id="cancel"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></g>
	<g id="arrow-back"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/></g>
	<g id="person-run"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.17 12l.57-2.5 2.1 2v5c0 .55.45 1 1 1s1-.45 1-1v-5.64c0-.55-.22-1.07-.62-1.45l-1.48-1.41.6-3c1.07 1.24 2.62 2.13 4.36 2.41.6.09 1.14-.39 1.14-1 0-.49-.36-.9-.85-.98-1.52-.25-2.78-1.15-3.45-2.33l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L7.21 7.76c-.74.32-1.22 1.04-1.22 1.85v2.37c0 .55.45 1 1 1s1-.45 1-1v-2.4l1.8-.7-1.6 8.1-3.92-.8c-.54-.11-1.07.24-1.18.78V17c-.11.54.24 1.07.78 1.18l4.11.82c1.06.21 2.1-.46 2.34-1.52z"/></g>
	<g id="slaves" viewBox="0 0 512 512">
        <path id="slaves SVG"
        fill="none" stroke="currentColor" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"
        d="M 320.81,59.25
           C 323.38,45.69 334.94,32.75 347.12,30.81
             359.31,28.88 366.75,36.94 368.81,43.94
             370.88,50.94 369.12,72.25 361.12,78.88
             353.12,85.50 318.25,72.81 320.81,59.25 Z
           M 273.75,105.12
           C 282.62,96.25 305.50,91.12 314.75,91.12M 289.00,117.50
           C 289.00,117.50 275.75,92.00 224.62,104.38
             173.50,116.75 169.25,169.75 194.62,189.75M 323.50,117.88
           C 323.50,117.88 324.88,140.25 324.38,148.00M 336.00,146.00
           C 323.75,146.12 277.00,162.12 283.12,188.88
             298.75,185.12 357.00,170.50 366.00,168.38
             377.75,138.00 356.25,98.12 356.25,98.12M 368.50,136.50
           C 372.25,115.00 378.94,87.19 384.75,81.25
             390.56,75.31 396.12,71.38 406.50,71.25
             416.88,71.12 438.56,71.44 438.56,71.44
             438.56,71.44 439.50,271.50 439.50,271.50M 493.06,272.06
           C 493.06,272.06 385.45,272.00 385.45,272.00M 379.27,272.36
           C 379.27,272.36 406.91,276.91 421.09,292.91
             435.27,308.91 442.91,320.36 443.09,352.18
             443.09,369.64 437.27,382.55 430.00,388.91
             422.73,395.27 411.27,400.00 411.27,400.00
             411.27,400.00 366.91,422.55 366.91,422.55
             366.91,422.55 334.55,478.36 334.55,478.36
             334.55,478.36 324.55,487.82 315.45,480.91
             306.36,474.00 308.55,463.27 308.55,463.27
             308.55,463.27 348.55,396.36 348.55,396.18
             348.55,396.00 396.36,370.73 396.36,370.73M 345.12,296.69
           C 338.62,295.06 328.36,285.45 328.91,271.09
             329.45,256.73 338.73,247.09 354.73,247.45
             370.73,247.82 378.91,260.55 378.91,269.09
             378.91,277.64 374.91,297.82 354.55,298.91
             334.18,300.00 319.45,302.55 319.45,302.55
             319.45,302.55 303.45,263.09 303.45,263.09
             303.45,263.09 298.25,252.31 286.62,257.69
             275.00,263.06 280.91,275.45 280.91,275.45
             280.91,275.45 298.55,316.91 298.55,316.91
             298.55,316.91 300.88,323.38 305.25,326.75
             309.62,330.12 315.25,330.25 315.25,330.25
             315.25,330.25 376.00,323.09 376.00,323.09M 383.09,352.64
           C 383.09,352.64 379.00,322.36 351.82,325.91M 443.55,407.73
           C 443.55,407.73 450.73,423.27 450.73,423.27
             450.73,423.27 491.27,445.55 491.27,445.55
             491.27,445.55 502.91,453.27 495.91,463.64
             488.91,474.00 478.09,470.18 478.09,470.18
             478.09,470.18 427.64,443.00 427.64,443.00
             427.64,443.00 418.82,423.36 418.82,423.36M 212.27,407.82
           C 212.27,407.82 219.36,423.27 219.36,423.27
             219.36,423.27 260.00,445.27 260.00,445.27
             260.00,445.27 270.73,451.18 265.36,463.18
             260.00,475.18 246.09,469.45 246.09,469.45
             246.09,469.45 196.55,442.82 196.55,442.82
             196.55,442.82 187.82,423.64 187.82,423.64M 278.45,272.45
           C 278.45,272.45 148.82,272.64 148.82,272.64M 148.45,270.73
           C 148.45,270.73 179.00,280.18 190.45,293.36
             201.91,306.55 212.27,322.09 211.82,350.55
             211.36,379.00 201.64,385.82 199.55,387.73
             197.45,389.64 188.00,396.33 188.00,396.33
             188.00,396.33 136.09,423.55 136.09,423.55
             136.09,423.55 103.27,477.45 103.27,477.45
             103.27,477.45 93.18,486.82 83.45,480.36
             73.73,473.91 77.73,462.18 77.73,462.18
             77.73,462.18 117.67,396.67 117.67,396.67
             117.67,396.67 165.33,371.00 165.33,371.00M 122.18,298.91
           C 105.13,298.52 97.82,282.55 97.82,271.45
             97.82,260.36 104.74,248.13 122.39,247.78
             140.04,247.43 150.57,259.30 148.78,274.74
             147.00,290.17 135.27,297.64 126.55,298.73
             117.82,299.82 88.70,302.00 88.70,302.00
             88.70,302.00 72.91,263.87 72.91,263.87
             72.91,263.87 66.22,252.61 55.78,257.35
             45.35,262.09 48.43,273.35 48.43,273.35
             48.43,273.35 67.27,318.00 67.27,318.00
             67.27,318.00 69.78,323.17 73.91,326.74
             78.04,330.30 85.65,330.39 85.65,330.39
             85.65,330.39 144.55,323.45 144.55,323.45M 151.73,352.91
           C 151.73,352.91 148.18,323.27 119.55,326.45M 10.88,272.25
           C 10.88,272.25 49.38,271.75 49.38,271.75M 31.22,269.61
           C 31.22,269.61 31.50,243.75 31.50,243.75
             31.50,243.75 173.12,242.75 173.12,242.75
             173.12,242.75 231.12,178.75 231.12,178.75
             231.12,178.75 234.09,175.50 237.38,173.66
             240.66,171.81 245.00,171.50 245.00,171.50
             245.00,171.50 263.25,171.50 263.25,171.50M 104.73,240.91
           C 104.73,240.91 126.39,202.35 126.39,202.35
             126.39,202.35 128.43,198.96 130.61,196.48
             132.78,194.00 136.00,192.18 136.00,192.18
             136.00,192.18 179.04,167.35 179.04,167.35" />
	</g>
	
	<g id="new-file"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M14.59 2.59c-.38-.38-.89-.59-1.42-.59H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.82-4.83zM15 16h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1zm-2-8V3.5L18.5 9H14c-.55 0-1-.45-1-1z"/></g>
	<g id="edit"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></g>
	<g id="pie-chart"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/></g>
	<g id="qr-code"><path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z" /></g>
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild(template.content);
