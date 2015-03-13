;NSIS Modern User Interface
;Start Menu Folder Selection Example Script
;Written by Joost Verburg

;--------------------------------
;Include Modern UI

  !include LogicLib.nsh
  !include "MUI2.nsh"

;--------------------------------
;General

  ;Name and file
  Name "visita-HCDN"
  OutFile "visita-HCDN_0.0.3.exe"

  ;Default installation folder
  InstallDir "c:\visita-HCDN"

  ;Get installation folder from registry if available
  InstallDirRegKey HKCU "visita-HCDN\visita-HCDN" ""

  ;Request application privileges for Windows Vista
  RequestExecutionLevel user

;--------------------------------
;Variables

  Var StartMenuFolder

;--------------------------------
;Interface Settings

  !define MUI_ABORTWARNING


;--------------------------------
;Pages

  !insertmacro MUI_PAGE_WELCOME
  !insertmacro MUI_PAGE_DIRECTORY




  ;Start Menu Folder Page Configuration
  !define MUI_STARTMENUPAGE_REGISTRY_ROOT "HKCU"
  !define MUI_STARTMENUPAGE_REGISTRY_KEY "Software\Modern UI Test"
  !define MUI_STARTMENUPAGE_REGISTRY_VALUENAME "Start Menu Folder"

  !insertmacro MUI_PAGE_STARTMENU Application $StartMenuFolder

  !insertmacro MUI_PAGE_INSTFILES

!define MUI_FINISHPAGE_RUN "$instdir\visita.exe"

!define MUI_PAGE_CUSTOMFUNCTION_SHOW ModifyRunCheckbox
!insertmacro MUI_PAGE_FINISH

Section "Maybe" SID_MAYBE
SectionEnd

Function ModifyRunCheckbox
${IfNot} ${SectionIsSelected} ${SID_MAYBE}
    SendMessage $mui.FinishPage.Run ${BM_SETCHECK} ${BST_UNCHECKED} 0
    EnableWindow $mui.FinishPage.Run 0
${EndIf}
FunctionEnd

  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES


;--------------------------------
;Languages

  !insertmacro MUI_LANGUAGE "Spanish"

;--------------------------------
;Installer Sections

Section "Dummy Section" SecDummy

  SetOutPath "$INSTDIR"

  File "visita.exe"
  File "credits.html"
  File "ffmpegsumo.dll"
  File "icudt.dll"
  File "libEGL.dll"
  File "libGLESv2.dll"
  File "nw.pak"
  File "nwsnapshot.exe"


  ;Store installation folder
  WriteRegStr HKCU "visita-HCDN\visita-HCDN" "" $INSTDIR

  ;Create uninstaller
  WriteUninstaller "$INSTDIR\desinstalar.exe"

  !insertmacro MUI_STARTMENU_WRITE_BEGIN Application

    ;Create shortcuts
    CreateDirectory "$SMPROGRAMS\$StartMenuFolder"
    CreateShortcut "$SMPROGRAMS\$StartMenuFolder\desinstalar.lnk" "$INSTDIR\desinstalar.exe"
    CreateShortCut "$SMPROGRAMS\$StartMenuFolder\conectar-educativo.lnk" "$INSTDIR\visita.exe"

  !insertmacro MUI_STARTMENU_WRITE_END

SectionEnd

;Uninstaller Section

Section "Uninstall"

  ;ADD YOUR OWN FILES HERE...

  Delete "$INSTDIR\Uninstall.exe"

  RMDir "$INSTDIR"

  !insertmacro MUI_STARTMENU_GETFOLDER Application $StartMenuFolder

  Delete "$SMPROGRAMS\$StartMenuFolder\desinstalar.lnk"
  RMDir "$SMPROGRAMS\$StartMenuFolder"

  DeleteRegKey /ifempty HKCU "Software\Modern UI Test"

SectionEnd
