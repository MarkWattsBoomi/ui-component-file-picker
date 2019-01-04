
declare var manywho: any;

import * as React from 'react';
import './FilePicker.css';

class TextFilePicker extends React.Component<any, any> 
{   
    componentId: string = "";
    flowKey: string ="";    
    attributes : any = {};
    selectedItem: string = null;


    text : string = "";

    constructor(props : any)
	{
        super(props);
        
        this.componentId = props.id;
        this.flowKey = props.flowKey;

        //push attributes into keyed map 
		var flowModel = manywho.model.getComponent(this.props.id,   this.props.flowKey);
		if(flowModel.attributes)
		{
			for(var key in flowModel.attributes)
			{
				this.attributes[key] = flowModel.attributes[key];
			}
        }
    }

    
    componentDidMount() 
    {
        this.forceUpdate();
    }

    componentDidUpdate()
    {

    }

	getAttribute(attributeName : string)
	{
		if(this.attributes[attributeName])
		{
			return this.attributes[attributeName];
		}
		else
		{
			return null;
		}
	}

       
    render()
    {
        const flowModel = manywho.model.getComponent(this.componentId,   this.flowKey);
        const flowState = manywho.state.getComponent(this.componentId,   this.flowKey);

        var filePick : any;
        var caption : string = this.getAttribute("Title") || "Select File";
        var width = flowModel.width + "px";
        var height=flowModel.height + "px";

        var style : any = {};
        style.width = width;
        style.height = height;

        if(flowModel.isEditable)
        {
            filePick = this.pickFile.bind(this);
            var clearButton = <span className="glyphicon glyphicon-remove file-box-header-button" onClick={this.clearFile.bind(this)}></span>;
        }

        return <div className="file-box" style={style} >
                    <div className="text-file-box-header">
                        <div className="file-box-header-left">
                            <span className="file-box-header-title">{caption}</span>
                        </div>
                        <div className="file-box-header-right">
                            {clearButton}
                        </div>
                        
                    </div>
                    <div className="text-file-box-body" onClick={filePick}>
                        <span ref="fname" className="file-name">{this.selectedItem}</span>
                        <input ref="file" type="file" className="file-file" onChange={this.fileSelected.bind(this)}></input>
                    </div>
               </div>
    }

    clearFile()
    {
        var file : any;
        file = this.refs.file;

    }
    pickFile()
    {
        var file : any;
        file = this.refs.file;
        file.click();
    }
    
    fileSelected()
    {
        var file : any;
        file = this.refs.file;

        if(file.files && file.files.length > 0)
        {
            const flowModel = manywho.model.getComponent(this.componentId,   this.flowKey);
            const flowState = manywho.state.getComponent(this.componentId,   this.flowKey);
            const aa = this;
            
            
            var reader = new FileReader();
            reader.onload = function (e : any) 
            {
                var fileData = btoa(e.target.result);
                flowState.contentValue = fileData;
            };
            this.selectedItem = file.files[0].name;
            this.forceUpdate();
            reader.readAsBinaryString(file.files[0]);
            
        }
    }

}

manywho.component.register('TextFilePicker', TextFilePicker);

export default TextFilePicker;