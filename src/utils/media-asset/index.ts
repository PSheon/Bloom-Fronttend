// ** Type Imports
import { UserDataType } from 'src/context/types'
import { MediaAssetType } from 'src/types/api/mediaAssetTypes'
import { ThemeColor } from 'src/@core/layouts/types'

const sanitizeText = (text: string): string => {
  return text.replace(/[#-]|[[-^]|[?|{}]/g, '').replace(' ', '')
}
const checkMediaAssetIsImage = (ext: string): boolean => /(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(ext)
const checkMediaAssetIsPdf = (ext: string): boolean => /(pdf)$/i.test(ext)
const getFormattedSize = (sizeInKB: number): string => {
  if (sizeInKB < 1) {
    return `${Math.round(sizeInKB * 1000)}B`
  } else if (sizeInKB < 1000) {
    return `${Math.round(sizeInKB)}KB`
  } else {
    return `${Math.round(sizeInKB / 1000)}MB`
  }
}

export const getMediaAssetFileAttributes = (mediaAsset: MediaAssetType) => {
  const isImage = checkMediaAssetIsImage(mediaAsset.ext)
  const isPdf = checkMediaAssetIsPdf(mediaAsset.ext)

  return {
    icon: isImage ? 'mdi:image-outline' : isPdf ? 'mdi:file-pdf-box' : 'mdi:file-outline',
    title: isImage ? '圖片' : isPdf ? 'PDF' : '檔案',
    color: isImage ? 'primary' : isPdf ? 'info' : ('warning' as ThemeColor),
    isImage,
    isPdf,
    formattedSize: getFormattedSize(mediaAsset.size)
  }
}

export const getMediaAssetFileInfo = (file: File, user: UserDataType) => {
  return {
    name: sanitizeText(file.name),
    alternativeText: `#{${user.id}}_${user.username}_media-asset_upload`,
    caption: `#{${user.id}}_${user.username}_media-asset_upload`
  }
}

export const getProposalFileInfo = (file: File, user: UserDataType) => {
  return {
    name: sanitizeText(file.name),
    alternativeText: `#{${user.id}}_${user.username}_proposal-file_upload`,
    caption: `#{${user.id}}_${user.username}_proposal-file_upload`
  }
}

export const getAvatarFileInfo = (file: File, user: UserDataType) => {
  return {
    name: sanitizeText(file.name),
    alternativeText: `#{${user.id}}_${user.username}_avatar_upload`,
    caption: `#{${user.id}}_${user.username}_avatar_upload`
  }
}

export const getPublicMediaAssetUrl = (mediaAssetUrl: string | undefined): string => {
  if (mediaAssetUrl !== undefined) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${mediaAssetUrl}`
  } else {
    return '/images/avatars/1.png'
  }
}
