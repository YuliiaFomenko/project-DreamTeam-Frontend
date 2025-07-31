import React from 'react'
import AddArticleForm from '../../components/AddArticleForm/AddArticleForm'
import styles from './CreateArticlePage.module.css'

const CreateArticlePage = () => {
  return (
    <div className='container'>
    <div className={styles.container}>
    <h1 className={styles.title}>Create an article</h1>
    <AddArticleForm/>
    </div>
    </div>
  )
}

export default CreateArticlePage