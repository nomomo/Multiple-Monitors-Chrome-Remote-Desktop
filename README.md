# Multiple-Monitors-Chrome-Remote-Desktop

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/nomomo/Multiple-Monitors-Chrome-Remote-Desktop/blob/main/README.en.md)

## 요약

**Multiple-Monitors-Chrome-Remote-Desktop** 은 Chrome Remote Desktop 을 여러 모니터에 걸쳐 실행할 수 있도록 해주는 Electron 기반의 간단한 브라우저 앱입니다.

### 아이디어

Chrome Remote Desktop 은 브라우저에서 사용 가능한 원격 데스크톱 도구입니다. Chrome Remote Desktop 은 기본적으로 다중 모니터를 지원하지 않습니다.

만약 브라우저를 여러 모니터에 걸쳐 띄울 수만 있다면 Chrome Remote Desktop도 여러 모니터에 걸쳐 사용할 수 있게 될 것입니다. 다만 창 테두리를 마우스로 드래그하는 등의 방식으로 창 사이즈를 조절하는 것에는 한계가 있습니다. 따라서 **본 앱은 전체 모니터를 커버하도록 프레임이 없는 전체 창모드로 브라우저를 띄웁니다**. (본 앱은 모든 모니터가 가로로 배치되어 있다고 가정합니다.)

## 사용 방법

- 다음의 링크에서 *Multiple-Monitors-Chrome-Remote-Desktop.x.x.x.zip* 파일을 다운로드 합니다. 파일 이름에서 *x.x.x* 는 버전에 해당합니다. **이 때 브라우저에서 파일의 다운로드를 차단할 수 있습니다. Chrome 브라우저의 경우 "계속" 버튼을 눌러 다운로드 하세요.**
- 다운로드 페이지 링크: <https://github.com/nomomo/Multiple-Monitors-Chrome-Remote-Desktop/releases>
- 다운로드 받은 zip 파일의 압축을 해제합니다.
- *Multiple-Monitors-Chrome-Remote-Desktop.exe* 을 실행합니다. **이 때 본 앱에 디지털 서명이 되어있지 않아 Windows Defender 또는 백신 프로그램이 앱의 실행을 차단할 수 있습니다. 백신 프로그램의 경우 다운로드 받은 파일을 예외에 추가하고, Windows Depender 의 경우 "추가 정보" 를 누른 후 실행 버튼을 눌러 실행하세요.**
- exe 파일을 실행하면 브라우저가 모든 모니터에 걸쳐 실행되며, Chrome Remote Desktop 접속 페이지<https://remotedesktop.google.com/access>로 연결됩니다.
- Chrome Remote Desktop 에서 Alt+Tab, Alt+F4 등의 단축키를 사용하려면 원격 접속 후 우측의 (>) 버튼을 눌러 메뉴를 연 후 "전체화면"을 클릭하세요. 아무 변화가 없는 것처럼 느껴지겠지만, Alt+Tab 을 눌러보면 Remote Desktop 내에서 단축키가 동작하는 것을 확인할 수 있을 것입니다.
- 앱을 종료하기 위해서는 원격 접속 후 메뉴에서 "연결 해제"를 눌러 원격 접속이 종료된 상태에서 Alt+F4 를 눌러 종료하세요.

## 사용자 설정

앱을 처음 실행하면 settings.json 파일이 생성됩니다. 이 파일의 내용을 텍스트 편집기로 수정한 후 앱을 재실행하면 변경 사항이 적용됩니다.

```javascript
{
  "alwaysOnTop": true,      // 앱을 항상 위에 표시합니다.
  "autoSizePos": true,      // true: 앱의 시작 위치와 크기를 자동으로 결정합니다. false: 사용자가 지정한 시작 위치와 크기로 앱을 실행합니다.
  "startUrl": "https://remotedesktop.google.com/access",    // 앱 시작 페이지
  "manualWidth": 3840,      // autoSizePos 가 false 일 경우 적용될 앱의 가로 사이즈
  "manualHeight": 1080,     //                                        세로 사이즈
  "manualPosX": 0,          //                                        가로 시작 위치(주모니터 기준)
  "manualPosY": 0           //                                        세로 시작 위치(주모니터 기준)
}
```

## 안내

- 본 앱은 사용자의 개인정보를 수집 및 전송하지 않습니다.
- 본 앱을 사용하며 프로그램 응답 없음/뻗음으로 인한 데이터 손실이나 기타 발생하는 다른 문제에 대하여 개발자는 책임지지 않습니다.(보고된 문제는 없음)

## Q&A

### 앱이 열릴 때 크기와 위치는 어떻게 결정되나요?

기본 설정의 경우, 본 앱은 모든 모니터가 가로로 배치되어 있다고 가정하고 앱의 사이즈 및 시작 위치를 자동으로 결정합니다.

- 가로 사이즈: 모든 모니터의 가로 해상도 값의 합계
- 세로 사이즈: 모니터 중 가장 작은 세로 해상도
- 시작 위치: 가장 왼쪽에 위치한 모니터의 왼쪽 상단

예시:

- 좌측: 1920x1080, 우측: 1920x1080 인 경우, 앱은 가장 좌측 모니터의 왼쪽 상단을 기준으로 3840x1080 사이즈로 열립니다.
- 좌측: 1920x1080, 우측: 1080x1920(피봇된 모니터) 인 경우, 앱은 가장 좌측 모니터의 왼쪽 상단을 기준으로 3000x1080 사이즈로 열립니다.
- 1920x1080 모니터 세 대를 가로로 배치하여 사용하는 경우, 앱은 가장 좌측 모니터의 왼쪽 상단을 기준으로 5760x1080 사이즈로 열립니다.

### 앱이 이상한 위치에 이상한 사이즈로 열려요

settings.json 파일의 autoSizePos 를 false 로 설정하고 manualWidth, manualHeight, manualPosX, manualPosY 값을 직접 입력하여 앱의 시작 위치와 크기를 수동으로 지정하세요.

### 앱의 시작 위치를 수동으로 입력할 때 manualPosX 과 manualPosY 는 어떻게 입력해야 하나요?

OS의 디스플레이 설정에서 "주 모니터"로 설정된 모니터의 가장 왼쪽 상단이 manualPosX 과 manualPosY 값이 모두 0일 때 앱의 시작위치 입니다.

예시:

- 1920x1080 모니터 두 대를 사용하고 주 모니터가 왼쪽 모니터인 경우, manualWidth 에 0 을 입력하면 좌측 모니터에서 창이 열리도록 할 수 있습니다.
- 1920x1080 모니터 두 대를 사용하고 주 모니터가 오른쪽 모니터인 경우, manualWidth 에 -1920 을 입력하면 좌측 모니터에서 창이 열리도록 할 수 있습니다.

### 현재 트리플 모니터를 사용하는데 원격 접속하려는 PC는 듀얼 모니터를 사용합니다

settings.json 파일의 autoSizePos 를 false 로 설정하고, manualWidth 를 원격 접속하려는 PC의 해상도로 설정하세요.

예시:

- 현재 PC 에서 1920x1080 해상도 모니터를 세 개 사용하고, 원격 접속하려는 PC가 1920x1080 해상도 모니터 두 개를 사용하는 경우: manualWidth 에 3840 을 입력하면 현재 PC의 모니터 두 개를 커버하도록 앱이 실행됩니다. 앱의 시작 위치는 "주 모니터"를 기준으로 결정됩니다. 만약 앱이 원하는 모니터에 실행되지 않은 경우 앱을 좌측 모니터로 이동시키려면 manualPosX 에 -1920 을, 앱을 우측 모니터로 이동시키려면 1920 을 입력하세요.

### 모니터 세 대를 ㄱ 자로 배치하여 사용하는데 창 사이즈가 이상해요

본 앱은 모든 모니터가 가로로 배치되어 있다고 가정하므로 발생한 문제입니다. autoSizePos 를 false 로 설정하고 앱 사이즈 및 시작 위치를 수동 지정해야 합니다.

예시:

- 1920x1080 모니터 세 대를 ㄱ모양으로 배치하여 사용하는 경우, 앱은 가장 좌측 모니터의 왼쪽 상단을 기준으로 5760x1080 사이즈로 열립니다.
- 이 때 3840x1080 사이즈로 창을 열기 원한다면 autoSizePos 를 false 로 설정하고 manualWidth 를 3840, manualHeight 를 1080 으로 지정해야 합니다.
- 모니터의 시작 위치는 "주모니터"를 기준으로 결정되므로 manualPosX 및 manualPosY 값을 적절히 지정하거나, 가장 왼쪽 상단의 모니터를 "주 모니터"로 설정하세요.

### 모니터 배율이 100% 가 아닐 때 수동 입력은 어떻게 하나요?

고해상도 모니터를 사용하는 경우 배율이 100% 가 아닌 경우가 있습니다. 이 때 창의 크기 및 위치를 수동 입력하려는 경우 다음의 예시를 참고하여 값을 입력해야 합니다.

예시:

- 3840x2160 해상도 모니터를 125% 배율로 사용하는 경우 실제 앱이 인식하는 모니터 해상도는 (3840/1.25)x(2160/1.25)=3072x1728 입니다.
- 만약 3840x2160 해상도 모니터 두 대를 가로로 배치하여 125% 배율로 사용하고 주 모니터가 오른쪽 모니터인 경우, 모든 모니터를 커버하도록 앱을 실행하려면 manualWidth 에 6144, manualHeight 에 1728, manualPosX 에 -3072, manualPosY 에 0 을 입력하면 됩니다.

### 앱을 실행하면 왜 Google 로그인을 요구하나요?

앱을 실행하면 Chrome Remote Desktop 페이지(<https://remotedesktop.google.com/access>)로 연결됩니다. Chrome Remote Desktop 을 사용하려면 Google에 로그인 해야합니다.

### 다운받은 exe 파일을 실행시키기 찜찜해요. 해킹툴이 심어져 있는 것 아닌가요?

Node.js를 사용할 줄 안다면 다음을 따라 직접 빌드하세요.

```bash
$ git clone https://github.com/nomomo/Multiple-Monitors-Chrome-Remote-Desktop.git
$ npm install
$ npm run build
```

## Change log

### 0.0.1 - Jun. 09 2023

- Initial commit

## License

MIT

## Happy??

<a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="60"></a>