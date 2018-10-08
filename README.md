# File Picker

A component that can either let a user select a file (or take a photo on a device) or display an image.


## Setup

- Grab the files from the /dist folder and import into your tenant.

- Add the files to your player code like this: -

        requires: ['core', 'bootstrap3'],
        customResources: [
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/FilePicker.css',
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/FilePicker.js'
                ],


- Add a component to your page, any type, save it then change it's "componentType" to "FilePicker" in the metadata editor and save it.
e.g. 
            "componentType": "FilePicker",

- Add a String value to hold your flow's current progress e.g. "ImageFile".

- Set the component's "State" to a the new field (e.g. ImageFile). 

- Set the "Editable" to "true" to enable file selection or "false" to make it a display only image box.

-Set the "width" & "height" of the component to control it's proportions.


## Extra Configuration

You can add attributes to the component to control it's appearance: -

- Title  - String - A string to display in the title bar of the component.

