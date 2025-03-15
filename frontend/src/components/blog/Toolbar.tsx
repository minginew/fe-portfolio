import { Editor } from '@tiptap/react';
import Items from './Items';

interface Props {
  editor: Editor | null;
}
const Toolbar = ({ editor }: Props) => {
  if (!editor) return null;
  return (
    <div className='flex w-full items-center justify-center gap-5 border-b-1 pb-2'>
      <div className='flex items-center justify-center gap-3'>
        <Items.H1 editor={editor} />
        <Items.H2 editor={editor} />
        <Items.H3 editor={editor} />
        <Items.H4 editor={editor} />
      </div>
      <div className='flex items-center justify-center gap-2'>
        <Items.Bold editor={editor} />
        <Items.Italic editor={editor} />
        <Items.Strikethrough editor={editor} />
      </div>
      <div className='flex items-center justify-center gap-2'>
        <Items.Code editor={editor} />
        <Items.CodeBlock editor={editor} />
        <Items.Quote editor={editor} />
        <Items.AddImage editor={editor} />
      </div>
    </div>
  );
};
export default Toolbar;
