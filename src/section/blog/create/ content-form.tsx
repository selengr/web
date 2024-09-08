'use client'

import { z } from 'zod'
import Editor from '@/components/theme/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast';
import { createBlogAction } from '../../../../actions/blog-action'
import { Textarea } from '@/components/ui/textarea'
import UploadForm from '@/components/uploader/page'
import { PutBlobResult } from '@vercel/blob'


export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

export default function ContentForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState<string>('')
  const [banner, setBanner] = useState<string>('')
  const [pending, setPending] = useState(false)
  const [tag, setTag] = useState([""]);

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    setSlug(name)
  }, [title])

  async function handleSubmit() {
    // TODO: validate the data
    setPending(true)
    if (tag[0].length > 0) {
      const result = await createBlogAction({ title, body, content, slug, banner, tag })
      if (result?.error) {
        toast({
          description: result.error,
        })
      }
    } else {
      toast({
        description: "area of coverage is required"
      })
    }

    setPending(false)
  }




  const onDrop = async (file: any) => {
    if (!file) return

    const formData = new FormData()
    formData.append('image', file[0])

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setBanner(data.id)
      } else {
        console.error('Failed to upload image')
      }
    } catch (error: any) {
      toast({
        description: error.message
      })
    }
    finally {
      setUploading(false)

    }



  }


  // const onDrop = async (pictureFiles: any, field: "cover" | "banner") => {

  //   const response = await fetch(
  //     `/api/avatar/upload?filename=${pictureFiles[0].name}`,
  //     {
  //       method: 'POST',
  //       body: pictureFiles[0],
  //     },
  //   );

  //   const newBlob = (await response.json()) as PutBlobResult;

  //   setBanner(newBlob.url)
  // };



  //------------------------------------------------------------------------

  const handleChange = (i: any, e: any) => {
    const newFormValues: any = [...tag];
    if (e.target.value.length > 21) {
      toast({
        description: "max character is 20",
      })
    } else {
      newFormValues[i] = e.target.value;
      setTag(newFormValues);
    }
  };

  const addFormFields = () => {
    if (tag.length < 6) {
      setTag([...tag, ""]);
    } else {
      toast({
        description: "max size is six",
      })
    }
  };

  const removeFormFields = (i: any) => {
    const newFormValues = [...tag];
    if (i !== 0) {
      newFormValues.splice(i, 1);
      setTag(newFormValues);
    } else if (i === 0 && newFormValues.length === 1) {
      setTag([""]);
    } else if (i === 0 && newFormValues.length > 1) {
      newFormValues.shift();
      setTag(newFormValues);
    }
  };
  //------------------------------------------------------------------------


  return (
    <div className='mt-6 flex max-w-5xl flex-col gap-4 justify-center'>

      <div className="w-full">


        <UploadForm
          id={"banner"}
          onDrop={(e: File[]) => onDrop(e)}
          label={"Banner Image "}
          defaultImage={banner}
        />

      </div>


      <div className='flex gap-4 w-full'>
        <div className='flex flex-col w-full'>
          <p>
            title
          </p>
          <Input
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <p>
            url name
          </p>
          <Input
            type='text'
            placeholder='url name'
            value={slug}
            disabled
          />
        </div>
      </div>
      <div className='flex flex-col'>
        <p>
          description
        </p>
        <Textarea placeholder="Type your post description here."
          onChange={e => setBody(e.target.value)}
          value={body}
        />
      </div>

      <div className='flex flex-col'>
        <p>
          area of coverage
        </p>
        {tag.map((element, index) => (
          <div className="form-inline flex flex-row gap-2 my-2" key={index}>
            <Input
              type='text'
              name="name"
              placeholder="name"
              value={element || ""}
              onChange={(e) => handleChange(index, e)}
            />

            <Button
              type="button"
              variant={"outline"}
              className="bg-red-500 text-white"
              onClick={() => removeFormFields(index)}
            >
              x
            </Button>
            <Button
              type="button"
              onClick={addFormFields}
            >
              Add More
            </Button>
          </div>
        ))}

      </div>

      <div className='flex flex-col'>
        <p >
          content <span className='text-xs'> (Press &prime;/&prime; for commands)</span>
        </p>
        <Editor initialValue={defaultValue} onChange={setContent}
        />
      </div>
      <Button onClick={handleSubmit} disabled={pending}>
        {pending ? 'Submitting...' : 'Create'}
      </Button>
    </div>
  )
}