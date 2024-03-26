import React, { useState } from 'react'
import SplitPane from 'react-split-pane';
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { DiJavascript } from "react-icons/di";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html as HTML } from "@codemirror/lang-html"
import { css as CSS } from "@codemirror/lang-css"
import { color } from '@uiw/codemirror-extensions-color';
const NewProject = () => {
  const [html, setHtml] = useState("")
  const [css, setCss] = useState(
    `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  `)
  const [js, setJs] = useState("")
  const [result, setResult] = useState("")
  return (
    <div className='text-white w-full h-full
      flex flex-col items-start justify-start overflow-hidden'>
      <div className='text-white  min-h-[66px] h-[66px]  w-full bg-red-400'>
        header
      </div>

      <div className='max-w-full w-full h-full flex-1'>
        <SplitPane split="horizontal">
          <SplitPane defaultSize={50} >
            <SplitPane split='vertical' minSize={"300px"} defaultSize={"33%"}>
              <div className="h-full w-full px-[5px] flex flex-col ">
                <div className='w-full flex items-center justify-between '>
                  <div className='flex items-center gap-1 bg-secondary px-2 py-1 rounded-sm border-t-2 border-gray-200'>
                    <FaHtml5 className='text-red-400' />
                    <p className='text-[13px]'>HTML</p>
                  </div>
                  <div className='flex  gap-2 items-center justify-center py-1 border-[.1px] rounded-sm px-1 bg-secondary cursor-pointer'>
                    <IoIosSettings />
                    <FaChevronDown />
                  </div>
                </div>
                <div className='w-full relative flex-1'>
                  <CodeMirror extensions={[HTML({ matchClosingTags: true })]} theme={"dark"} height='100%' style={{ scrollbarColor: "green" }} className='absolute top-0 left-0 w-[100%] h-[100%] bg-black'
                    onChange={(value, viewUpdate) => { setHtml(value) }}
                    value={html}
                  />
                </div>
              </div>
            </SplitPane>
            <SplitPane split='vertical' minSize={"300px"} defaultSize={"33%"}>
              <div className="h-full w-full px-[5px] flex flex-col">
                <div className='w-full flex items-center justify-between '>
                  <div className='flex items-center gap-1 bg-secondary px-2 py-1 rounded-sm border-t-2 border-gray-200'>
                    <FaCss3Alt className='text-blue-400' />
                    <p className='text-[13px]'>CSS</p>
                  </div>
                  <div className='flex  gap-2 items-center justify-center py-1 border-[.1px] rounded-sm px-1 bg-secondary cursor-pointer'>
                    <IoIosSettings />
                    <FaChevronDown />
                  </div>
                </div>
                <div className='w-full relative flex-1'>
                  <CodeMirror extensions={[CSS(), color]} theme={"dark"} height='100%' style={{ scrollbarColor: "green" }} className='absolute top-0 left-0 w-[100%] h-[100%] bg-black'
                    onChange={(value, viewUpdate) => { setCss(value) }}
                    value={css}
                  />
                </div>
              </div>
            </SplitPane>
            <SplitPane split='vertical' minSize={"300px"} defaultSize={"33%"} >
              <div className="h-full w-full px-[5px] flex flex-col">
                <div className='w-full flex items-center justify-between '>
                  <div className='flex items-center gap-1 bg-secondary px-2 py-1 rounded-sm border-t-2 border-gray-200'>
                    <DiJavascript className='text-yellow-400 ' />
                    <p className='text-[13px]'>JS</p>
                  </div>
                  <div className='flex  gap-2 items-center justify-center py-1 border-[.1px] rounded-sm px-1 bg-secondary cursor-pointer'>
                    <IoIosSettings />
                    <FaChevronDown />
                  </div>
                </div>
                <div className='w-full relative flex-1'>
                  <CodeMirror extensions={[javascript({ jsx: true })]} theme={"dark"} height='100%' style={{ scrollbarColor: "green" }} className='absolute top-0 left-0 w-[100%] h-[100%] bg-black'
                    onChange={(value, viewUpdate) => { setJs(value) }}
                    placeholder={"//hello"}
                    value={js}
                  />
                </div>
              </div>
            </SplitPane>

          </SplitPane>
          <SplitPane minSize={"50px"}></SplitPane>
        </SplitPane>
      </div>

    </div >
  )
}

export default NewProject