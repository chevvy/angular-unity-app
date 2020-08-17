import { Component, OnInit } from '@angular/core';
declare var createUnityInstance;

@Component({
  selector: 'app-fps-template',
  templateUrl: './fps-template.component.html',
  styleUrls: ['./fps-template.component.scss']
})
export class FpsTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const buildUrl = 'assets/Games/FPS';
    const loaderUrl = buildUrl + '/buildWeb.loader.js';
    const config = {
      dataUrl: buildUrl + '/buildWeb.data',
      frameworkUrl: buildUrl + '/buildWeb.framework.js',
      codeUrl: buildUrl + '/buildWeb.wasm',
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'DefaultCompany',
      productName: 'testPlatformer',
      productVersion: '0.1',
      devicePixelRatio: null,
    };

    const container = document.querySelector('#unity-container');
    const canvas = document.querySelector('#unity-canvas');
    const loadingBar = document.querySelector('#unity-loading-bar');
    const progressBarFull = document.querySelector('#unity-progress-bar-full');
    const fullscreenButton = document.querySelector('#unity-fullscreen-button');

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = 'unity-mobile';
      config.devicePixelRatio = 1;
    } else {
      // @ts-ignore
      canvas.style.width = '960px';
      // @ts-ignore
      canvas.style.height = '600px';
    }
    // @ts-ignore
    loadingBar.style.display = 'block';

    const script = document.createElement('script');
    script.src = loaderUrl;

    createUnityInstance(canvas, config, (progress) => {
      // @ts-ignore
      progressBarFull.style.width = 100 * progress + '%';
    }).then((unityInstance) => {
      // @ts-ignore
      loadingBar.style.display = 'none';
      // @ts-ignore
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
    }).catch((message) => {
      alert(message);
    });
  }
}
