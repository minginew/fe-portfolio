import Toolbar from './Toolbar';

//editor
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

//lowlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
const lowlight = createLowlight(all);

console.log(lowlight.listLanguages());
const Editor = () => {
  const extensions = [
    StarterKit,
    Image.configure({ inline: true, allowBase64: true }),
    CodeBlockLowlight.configure({
      lowlight,
      HTMLAttributes: {
        class: 'language-js',
      },
    }),
  ];
  const content = '';
  const editorProps = {
    attributes: {
      class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl w-full h-full focus:outline-none',
    },
  };

  return (
    <EditorProvider
      extensions={extensions}
      slotBefore={<Toolbar />}
      content={content}
      editable={true}
      editorProps={editorProps}
    />
  );
};
export default Editor;
