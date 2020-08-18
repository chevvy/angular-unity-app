import { Component, OnInit } from '@angular/core';
declare var createUnityInstance;

@Component({
  selector: 'app-fps-template',
  templateUrl: './fps-template.component.html',
  styleUrls: ['./fps-template.component.scss']
})
export class FpsTemplateComponent implements OnInit {
  UnityInstance: any;

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
      productName: 'shootyMcShot',
      productVersion: '0.1',
      devicePixelRatio: null,
    };

    const container: HTMLElement = document.querySelector('#unity-container');
    const canvas: HTMLElement = document.querySelector('#unity-canvas');
    const loadingBar: HTMLElement = document.querySelector('#unity-loading-bar');
    const progressBarFull: HTMLElement = document.querySelector('#unity-progress-bar-full');
    const fullscreenButton: HTMLElement = document.querySelector('#unity-fullscreen-button');

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = 'unity-mobile';
      config.devicePixelRatio = 1;
    } else {
      canvas.style.width = '960px';
      canvas.style.height = '600px';
    }
    loadingBar.style.display = 'block';

    const script = document.createElement('script');
    script.src = loaderUrl;

    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + '%';
    }).then((unityInstance) => {
      this.UnityInstance = unityInstance;
      loadingBar.style.display = 'none';
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
    }).catch((message) => {
      alert(message);
    });
  }

  killEnemy() {
    this.UnityInstance.SendMessage('Enemy_HoverBot', 'OnDie');
  }
}
