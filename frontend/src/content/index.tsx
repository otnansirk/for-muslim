import { createRoot } from "react-dom/client";
import Notify from "./Notify";

const rootElement = document.createElement("div");
const style = document.createElement("style");
rootElement.id = "chrome-extension-root";
document.body.appendChild(rootElement);

const shadowRoot = rootElement.attachShadow({ mode: "open" });
style.textContent = `
    .for-muslim__notify {
        padding: 18px 24px;
        display: inline-block;
        position: fixed;
        top: -5%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 18px;
        border: 1px solid #ababab4c;
        backdrop-filter: blur(15px);
        background-color: #ffffffa6;
        color: black;
        cursor: pointer;
        transition: all .3s;
        z-index: 9999;

        &.active {
            top: 7%;
        }

        .content {
            display: flex;
            align-items: center;
            gap: 14px;
            font-size: 14px;
            position: relative;
            font-size: 16px;
            font-family: -apple-system, system-ui, Ubuntu, Roboto, "Open Sans", "Segoe UI", "Helvetica Neue";
        }

        img {
            width: 24px;
        }
    }
    
    .bell{
        -webkit-animation: ring 3s ease-in-out infinite;
        -webkit-transform-origin: 50% 4px;
        -moz-animation: ring 3s ease-in-out infinite;
        -moz-transform-origin: 50% 4px;
        animation: ring 3s ease-in-out infinite;
        transform-origin: 50% 4px;
    }
    
    @-webkit-keyframes ring {
        0% { -webkit-transform: rotateZ(0); }
        1% { -webkit-transform: rotateZ(30deg); }
        3% { -webkit-transform: rotateZ(-28deg); }
        5% { -webkit-transform: rotateZ(34deg); }
        7% { -webkit-transform: rotateZ(-32deg); }
        9% { -webkit-transform: rotateZ(30deg); }
        11% { -webkit-transform: rotateZ(-28deg); }
        13% { -webkit-transform: rotateZ(26deg); }
        15% { -webkit-transform: rotateZ(-24deg); }
        17% { -webkit-transform: rotateZ(22deg); }
        19% { -webkit-transform: rotateZ(-20deg); }
        21% { -webkit-transform: rotateZ(18deg); }
        23% { -webkit-transform: rotateZ(-16deg); }
        25% { -webkit-transform: rotateZ(14deg); }
        27% { -webkit-transform: rotateZ(-12deg); }
        29% { -webkit-transform: rotateZ(10deg); }
        31% { -webkit-transform: rotateZ(-8deg); }
        33% { -webkit-transform: rotateZ(6deg); }
        35% { -webkit-transform: rotateZ(-4deg); }
        37% { -webkit-transform: rotateZ(2deg); }
        39% { -webkit-transform: rotateZ(-1deg); }
        41% { -webkit-transform: rotateZ(1deg); }
    
        43% { -webkit-transform: rotateZ(0); }
        100% { -webkit-transform: rotateZ(0); }
    }
    
    @-moz-keyframes ring {
        0% { -moz-transform: rotate(0); }
        1% { -moz-transform: rotate(30deg); }
        3% { -moz-transform: rotate(-28deg); }
        5% { -moz-transform: rotate(34deg); }
        7% { -moz-transform: rotate(-32deg); }
        9% { -moz-transform: rotate(30deg); }
        11% { -moz-transform: rotate(-28deg); }
        13% { -moz-transform: rotate(26deg); }
        15% { -moz-transform: rotate(-24deg); }
        17% { -moz-transform: rotate(22deg); }
        19% { -moz-transform: rotate(-20deg); }
        21% { -moz-transform: rotate(18deg); }
        23% { -moz-transform: rotate(-16deg); }
        25% { -moz-transform: rotate(14deg); }
        27% { -moz-transform: rotate(-12deg); }
        29% { -moz-transform: rotate(10deg); }
        31% { -moz-transform: rotate(-8deg); }
        33% { -moz-transform: rotate(6deg); }
        35% { -moz-transform: rotate(-4deg); }
        37% { -moz-transform: rotate(2deg); }
        39% { -moz-transform: rotate(-1deg); }
        41% { -moz-transform: rotate(1deg); }
    
        43% { -moz-transform: rotate(0); }
        100% { -moz-transform: rotate(0); }
    }
    
    @keyframes ring {
        0% { transform: rotate(0); }
        1% { transform: rotate(30deg); }
        3% { transform: rotate(-28deg); }
        5% { transform: rotate(34deg); }
        7% { transform: rotate(-32deg); }
        9% { transform: rotate(30deg); }
        11% { transform: rotate(-28deg); }
        13% { transform: rotate(26deg); }
        15% { transform: rotate(-24deg); }
        17% { transform: rotate(22deg); }
        19% { transform: rotate(-20deg); }
        21% { transform: rotate(18deg); }
        23% { transform: rotate(-16deg); }
        25% { transform: rotate(14deg); }
        27% { transform: rotate(-12deg); }
        29% { transform: rotate(10deg); }
        31% { transform: rotate(-8deg); }
        33% { transform: rotate(6deg); }
        35% { transform: rotate(-4deg); }
        37% { transform: rotate(2deg); }
        39% { transform: rotate(-1deg); }
        41% { transform: rotate(1deg); }
    
        43% { transform: rotate(0); }
        100% { transform: rotate(0); }
    }
`
shadowRoot.appendChild(style)
const root = createRoot(shadowRoot);
root.render(<Notify show="active" />);