import { useCurrentEditor } from '@tiptap/react';
import Items from './Items';

const Toolbar = () => {
  const { editor } = useCurrentEditor();
  return (
    <div className='flex w-full items-center gap-4 border-b-1 px-4 pb-2'>
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
        {/* <Icon.AddPhoto editor={editor} /> */}
      </div>
    </div>
  );
};
export default Toolbar;
