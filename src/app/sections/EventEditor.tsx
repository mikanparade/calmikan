'use client';

import Text from '../fundamentals/Text';
import Button from '../fundamentals/Button';
import RadioButton from '../fundamentals/RadioButton';
import { useRouter } from 'next/navigation';
import InputText from '../fundamentals/InputText';
import { Turret_Road } from 'next/font/google';

export default function EventEditor() {
  const router = useRouter();

  const handleReturnButtonClick = () => {
    router.back();
  };

  const handleChangeButtonClick = () => {};

  const handleChangeText = () => {};

  const handleDateRadioChange = () => {};

  const handleRoopRadioChange = () => {};

  const handleRoopEndRadioButton = () => {};

  const handleCancelClick = () => {};

  const handleSaveClick = () => {};

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="rounded-md max-w-xl mx-auto mt-10 p-4 bg-white shadow-md">
        <div className="flex">
          <Button
            buttonKey={['return_button']}
            onClick={handleReturnButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            戻る
          </Button>
          <Text
            type="heading"
            colorName="gray"
            colorNum="7"
            content="新しい予定の作成"
            className="text-2xl font-semibold mb-4"
          ></Text>
        </div>
        <form>
          <div className="mb-4">
            <InputText
              buttonKey={['InputText']}
              onChange={handleChangeText}
              className="w-full p-2 border rounded"
              value="名前、日付、時間、……"
            ></InputText>
          </div>
          <div className="mb-4">
            <Text
              type="heading"
              colorName="leaf"
              colorNum="7"
              content="日付や時間は上の入力欄への入力によって簡単に設定できます"
              className="block text-sm font-medium mb-2"
            ></Text>
          </div>
          <div className="mb-4">
            <Text
              type="body"
              colorName="gray"
              colorNum="7"
              content="日時"
              className="block text-sm font-medium mb-2"
            ></Text>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <Text type="body" colorName="gray" colorNum="7" content="08月20日 (日)"></Text>
                <Button
                  buttonKey={['ChangeButton']}
                  onClick={handleChangeButtonClick}
                  className="border"
                >
                  変更
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start">
            <RadioButton
              buttonKey={['DateRadioButton']}
              onChange={handleDateRadioChange}
              name="DateRadioButton"
              checked={true}
              value="AllDay"
            >
              終日
            </RadioButton>
            <div className="flex justify-between">
              <RadioButton
                buttonKey={['DateRadioButton']}
                onChange={handleDateRadioChange}
                name="DateRadioButton"
                checked={false}
                value="13:29~14:29"
              >
                13:29-14:29 (60分)
              </RadioButton>
              <Button
                buttonKey={['ChageButton']}
                onClick={handleChangeButtonClick}
                className="border"
              >
                変更
              </Button>
            </div>
          </div>
          <div></div>
          <div className="mb-4">
            <Text
              type="body"
              colorName="gray"
              colorNum="7"
              content="繰り返し"
              className="block text-sm font-medium mb-2"
            ></Text>
            <div>
              <div className="flex space-x-4">
                <RadioButton
                  buttonKey={['RoopRadioButton']}
                  onChange={handleRoopRadioChange}
                  name="RoopRadioButton"
                  checked={true}
                  value="None"
                >
                  なし
                </RadioButton>
                <RadioButton
                  buttonKey={['RoopRadioButton']}
                  onChange={handleRoopRadioChange}
                  name="RoopRadioButton"
                  checked={true}
                  value="Day"
                >
                  毎日
                </RadioButton>
                <RadioButton
                  buttonKey={['RoopRadioButton']}
                  onChange={handleRoopRadioChange}
                  name="RoopRadioButton"
                  checked={true}
                  value="Week"
                >
                  毎週
                </RadioButton>
                <RadioButton
                  buttonKey={['RoopRadioButton']}
                  onChange={handleRoopRadioChange}
                  name="RoopRadioButton"
                  checked={true}
                  value="Month"
                >
                  毎月
                </RadioButton>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Text
              type="body"
              colorName="gray"
              colorNum="7"
              content="繰り返しの終了"
              className="block text-sm font-medium mb-2"
            ></Text>
            <div className="space-y-2">
              <RadioButton
                buttonKey={['RoopEndRadioButton']}
                onChange={handleRoopEndRadioButton}
                name="RoopEndRadioButton"
                checked={true}
                value="None"
              >
                なし
              </RadioButton>
              <div className="flex justify-between">
                <RadioButton
                  buttonKey={['RoopEndRadioButton']}
                  onChange={handleRoopEndRadioButton}
                  name="RoopEndRadioButton"
                  checked={true}
                  value="09/19"
                >
                  09月19日 (火) (30日後)
                </RadioButton>
                <Button
                  buttonKey={['ChangeButton']}
                  onClick={handleChangeButtonClick}
                  className="border"
                >
                  変更
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justyfy-between">
              <div className="flex flex-col">
                <Button
                  buttonKey={['CancelButton']}
                  onClick={handleCancelClick}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  キャンセル
                </Button>
                <Button
                  buttonKey={['SaveButton']}
                  onClick={handleSaveClick}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  保存
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
