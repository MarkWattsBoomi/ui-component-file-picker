
declare var manywho: any;

import * as React from 'react';
import './FilePicker.css';

class FilePicker extends React.Component<any, any> 
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
                    <div className="file-box-header">
                        <div className="file-box-header-left">
                            <span className="file-box-header-title">{caption}</span>
                        </div>
                        <div className="file-box-header-right">
                            {clearButton}
                        </div>
                        
                    </div>
                    <div className="file-box-body" onClick={filePick}>
                        <img ref="img" className="file-image" src={flowState.contentValue}></img>
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
                var resized = aa.ResizeBase64Img(e.target.result,400);
            };

            reader.readAsDataURL(file.files[0]);
            
        }
    }

    ResizeBase64Img(base64 : string, width : number) 
    {
        const flowState = manywho.state.getComponent(this.componentId,   this.flowKey);
        const flowModel = manywho.model.getComponent(this.componentId,   this.flowKey);
        var img = new Image();
        var state : any =this;
        img.onload = function()
        {
            
            var aspectRatio = img.height /img.width;
            var canvas = document.createElement("canvas");
            
            var reductionFactor = width / img.width;
            
            canvas.width = width;
            canvas.height = width * aspectRatio;
            
            var context = canvas.getContext("2d");

            var reductionFactor = width / img.width;
            context.scale(canvas.width/img.width , canvas.height / img.height);
        
            context.drawImage(img, 0 , 0);
            var resized = canvas.toDataURL();
            
            flowState.contentValue = resized;
            img.src = resized;
            state.forceUpdate();
        }
        img.src = base64;
    }
}

manywho.component.register('FilePicker', FilePicker);

export default FilePicker;