from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    location = settings.AWS_STATIC_LOCATION


class ProductImageStorage(S3Boto3Storage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION + '/images/products'
    file_overwrite = False


class ProfileImageStorage(S3Boto3Storage):
    location = settings.AWS_PRIVATE_MEDIA_LOCATION + '/images/profiles'


class ReviewImageStorage(S3Boto3Storage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION + '/images/reviews'


class EventMainImageStorage(S3Boto3Storage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION + '/images/event_main'


class EventPreviewImageStorage(S3Boto3Storage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION + '/images/event_preview'


class BannerImageStorage(S3Boto3Storage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION + '/images/banner'


class InstaImageStorage(S3Boto3Storage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION + '/images/instagram'
