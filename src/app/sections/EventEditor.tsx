"use client"

import Text from '../fundamentals/Text';
import Button from '../fundamentals/Button';
import RadioButton from '../fundamentals/RadioButton';
import { useRouter } from 'next/navigation';
import InputText from '../fundamentals/InputText';

export default function EventEditor() {
  const router = useRouter();

  const handleReturnButtonClick = () => {
    router.back();
  }

  const handleChangeButtonClick = () => {

  }

  return (
    <div>
      <div className='flex justify-center p-5'>
        <Button buttonKey={['return_button']} onClick={handleReturnButtonClick} className='rounded-none border w-5 h-6' children='⇦'></Button>
        <Text type='heading' colorName='gray' colorNum={7} content='新しい予定の作成' className='p-2'></Text>
      </div>
      <div className='flex flex-col items-center'>
        <InputText buttonKey={['InputText']} className='border' value='名前、日付、時間、....'></InputText>
        <Text type='body' colorName='leaf' colorNum={7} content='日付や時間は上の入力欄への入力によって簡単に設定できます。' className='border'></Text>
      </div>
      <div className='flex flex-col'>
        <Text type='body' colorName='gray' colorNum={7} content='日時' className='p-2'></Text>
        <Text type='body' colorName='gray' colorNum={7} content='08月19日(土)' className='px-7'></Text>
        <Button buttonKey={['change_button']} onClick={handleChangeButtonClick} className='border w-10' children='変更'></Button>
      </div>
    </div>
  );
}
