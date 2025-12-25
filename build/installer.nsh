; 自定义NSIS安装脚本
; 用于添加额外的安装步骤和自定义行为

; 在安装完成后显示自定义消息
!define MUI_FINISHPAGE_SHOWREADME
!define MUI_FINISHPAGE_SHOWREADME_TEXT "查看使用说明"
!define MUI_FINISHPAGE_SHOWREADME_FUNCTION ShowReadme

Function ShowReadme
  ExecShell "open" "https://inv-veri.chinatax.gov.cn/"
FunctionEnd

; 添加自定义页面来显示安装信息
Page custom CustomPageShow

Function CustomPageShow
  !insertmacro MUI_HEADER_TEXT "发票助手" "全国增值税发票查验平台"
  
  nsDialogs::Create 1018
  Pop $0
  
  ${NSD_CreateLabel} 0 0 100% 40u "发票助手是一款便捷的全国增值税发票查验工具，帮助您快速验证发票真伪。"
  Pop $0
  
  ${NSD_CreateLabel} 0 50u 100% 20u "功能特点："
  Pop $0
  
  ${NSD_CreateLabel} 20 75u 100% 15u "• 支持全国增值税发票查验"
  Pop $0
  
  ${NSD_CreateLabel} 20 95u 100% 15u "• 简洁易用的用户界面"
  Pop $0
  
  ${NSD_CreateLabel} 20 115u 100% 15u "• 快速准确的查验结果"
  Pop $0
  
  nsDialogs::Show
FunctionEnd
