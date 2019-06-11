
import * as React from 'react';
import './css/FilePicker.css';
import { FlowComponent } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowComponent';
import { IManywho } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/interfaces';

declare const manywho: IManywho;

class TextFilePicker extends FlowComponent {
    selectedItem: string = null;

    text: string = '';
    fileInput: any;

    constructor(props: any) {
        super(props);

        this.fileSelected = this.fileSelected.bind(this);
        this.clearFile = this.clearFile.bind(this);
        this.pickFile = this.pickFile.bind(this);

    }

    async componentDidMount() {
        await super.componentDidMount();
    }

    render() {

        let filePick: any;
        const caption: string = this.getAttribute('title') || 'Select File';
        const width = this.model.width + 'px';
        const height = this.model.height + 'px';

        const style: any = {};
        style.width = width;
        style.height = height;

        let clearButton: any;

        if (this.model.readOnly === false) {
            filePick = this.pickFile;
            clearButton = (<span className="glyphicon glyphicon-remove file-box-header-button" onClick={this.clearFile}></span>);
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
                        <img ref="img" className="file-image" src={this.getStateValue() as string}></img>
                        <input ref={(e: any) => {this.fileInput = e; }} type="file" className="file-file" onChange={this.fileSelected}></input>
                    </div>
               </div>;
    }

    clearFile() {
        let file: any;
        file = this.fileInput;
    }

    pickFile() {
        let file: any;
        file = this.fileInput;
        file.click();
    }

    fileSelected() {
        let file: any;
        file = this.refs.file;

        if (file.files && file.files.length > 0) {
            const flowModel = manywho.model.getComponent(this.componentId,   this.flowKey);
            const flowState = manywho.state.getComponent(this.componentId,   this.flowKey);
            const aa = this;

            const reader = new FileReader();
            reader.onload = function(e: any) {
                const fileData = btoa(e.target.result);
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

