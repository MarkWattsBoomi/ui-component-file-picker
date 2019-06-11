import * as React from 'react';
import './css/FilePicker.css';
import { FlowComponent } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowComponent';
import { IManywho } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/interfaces';

declare const manywho: IManywho;

class FilePicker extends FlowComponent {
    selectedItem: string = null;

    text: string = '';
    fileInput: any;

    constructor(props: any) {
        super(props);

        this.fileSelected = this.fileSelected.bind(this);
        this.ResizeBase64Img = this.ResizeBase64Img.bind(this);
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
        file = this.fileInput;

        if (file.files && file.files.length > 0) {
            const me = this;

            const reader = new FileReader();
            reader.onload = function(e: any) {
                const resized = me.ResizeBase64Img(e.target.result, 400);
            };

            reader.readAsDataURL(file.files[0]);

        }
    }

    ResizeBase64Img(base64: string, width: number) {

        const img = new Image();
        const me  = this;
        img.onload = function() {

            const aspectRatio = img.height / img.width;
            const canvas = document.createElement('canvas');

            canvas.width = width;
            canvas.height = width * aspectRatio;

            const context = canvas.getContext('2d');

            const reductionFactor = width / img.width;
            context.scale(canvas.width / img.width , canvas.height / img.height);

            context.drawImage(img, 0 , 0);
            const resized = canvas.toDataURL();

            me.setStateValue(resized);
            img.src = resized;
            img.onload = null;
            me.forceUpdate();
        };
        img.src = base64;
    }
}

manywho.component.register('FilePicker', FilePicker);

export default FilePicker;
