import { Button, Form, Input, message, Modal, Tooltip } from 'antd';
import React from 'react';
import { AiFillFolderAdd } from 'react-icons/ai';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { createFolderMutation } from '@/graphql-client/mutations';
import { useEffect } from 'react';
import { getFolders } from '@/graphql-client/queries';

type Props = {};

const NewFolder = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createFolder, { data, loading, error }] =
    useMutation(createFolderMutation);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    if (values.folderName) {
      try {
        await createFolder({
          variables: {
            name: values.folderName,
          },
          refetchQueries: [{ query: getFolders }],
        });
        messageApi.open({
          type: 'success',
          content: 'Folder created successfully',
        });
        form.resetFields();
      } catch (e) {}
    }
  };
  useEffect(() => {
    if (data) {
      handleCancel();
    }
  }, [data]);
  return (
    <div>
      {contextHolder}
      <Tooltip className="cursor-pointer" title="Add Folder">
        <AiFillFolderAdd size={24} color="white" onClick={showModal} />
      </Tooltip>
      <Modal title="New Folder" footer={null} open={isModalOpen}>
        <Form className="" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="folderName"
            rules={[{ required: true, message: 'Please enter folder name!' }]}
            help={error?.message}
            validateStatus={error ? 'error' : 'success'}
          >
            <Input placeholder={'Folder Name'} />
          </Form.Item>
          <div className="flex gap-2 justify-end">
            <Form.Item className="mb-0">
              <Button htmlType="button" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className="mb-0">
              <Button
                className="bg-[#1677ff] text-white hover:bg-[#4096ff] "
                htmlType="submit"
              >
                OK
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default NewFolder;
