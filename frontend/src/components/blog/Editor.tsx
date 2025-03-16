import Toolbar from './Toolbar';

//editor
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

//lowlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';

//StorageApi
import { useUploadProjectFileMutation, useUploadPostFileMutation } from '@/redux/api/storageApi';

//react
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/router';

interface Props {
  initailState: string;
  onContentBlur(data: string): void;
}
const lowlight = createLowlight(all);

const Editor = ({ initailState, onContentBlur }: Props) => {
  const location = useLocation();

  //Mutation
  const [uploadProjectFile] = useUploadProjectFileMutation();
  const [uploadPostFile] = useUploadPostFileMutation();

  useEffect(() => {
    if (!initailState) return;
    editor?.commands.setContent(initailState);
  }, [initailState]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
      TiptapImage.configure({ inline: true, allowBase64: true }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'language-js',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'w-[95%] min-h-60 focus:outline-none',
      },
      handleDrop: function (view, event, _, moved) {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          // if dropping external files
          let file = event.dataTransfer.files[0]; // the dropped file
          let filesize = (file.size / 1024 / 1024).toFixed(4); // filesize in MB
          if ((file.type === 'image/jpeg' || file.type === 'image/png') && parseInt(filesize) < 10) {
            // check valid image type under 10MB
            // check the dimensions
            let _URL = window.URL || window.webkitURL;
            let img = new Image(); /* global Image */
            img.src = _URL.createObjectURL(file);
            img.onload = async () => {
              if (img.width > 5000 || img.height > 5000) {
                window.alert('Your images need to be less than 5000 pixels in height and width.'); // display alert
              } else {
                // valid image so upload to server
                // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
                let src = '';

                if (location.pathname.startsWith(ROUTES.PROJECT_EDIT)) {
                  const { data } = await uploadProjectFile(file);
                  if (data) {
                    src = data.url;
                  }
                } else if (location.pathname.startsWith(ROUTES.POST_EDIT)) {
                  const { data } = await uploadPostFile(file);
                  if (data) {
                    src = data.url;
                  }
                }
                let image = new Image();
                image.src = src;
                image.onload = function () {
                  // place the now uploaded image in the editor where it was dropped
                  const { schema } = view.state;
                  const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                  if (coordinates === null) {
                    window.alert('Invalid coordinates, nothing to insert.');
                    return;
                  }
                  const node = schema.nodes.image.create({ src: src }); // creates the image element
                  const transaction = view.state.tr.insert(coordinates.pos, node); // places it in the correct position
                  return view.dispatch(transaction);
                };
              }
            };
          } else {
            window.alert('Images need to be in jpg or png format and less than 10mb in size.');
          }
          return true; // handled
        }
        return false; // not handled use default behaviour
      },
    },
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent
        className='flex w-full justify-center px-4 pb-4'
        editor={editor}
        onBlur={() => onContentBlur(editor?.getHTML() || '')}
      />
    </>
  );
};
export default Editor;
