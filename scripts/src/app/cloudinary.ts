const imagekitBaseUrl = 'https://ik.imagekit.io/c3c8rilyq';
const imagekitVideoFolder = '/Videos';

export const galleryListUrl = '/api/imagekit-list';

const ensureLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`);
const ensureMp4Extension = (value: string) => (value.toLowerCase().endsWith('.mp4') ? value : `${value}.mp4`);
const encodeFilename = (value: string) => encodeURIComponent(value);

export const makeCloudinaryVideoUrl = (publicId: string) => {
  const folder = ensureLeadingSlash(imagekitVideoFolder);
  const filename = encodeFilename(ensureMp4Extension(publicId));
  return `${imagekitBaseUrl}${folder}/${filename}`;
};

export const cloudinaryVideoPublicIds = {
  donorsFilm: 'film-0m25-1m25',
  homeGalleryFeature: 'film total',
  homeGalleryTikiya: 'tikiya 200',
  homeGalleryWater2: 'water 2',
  homeGalleryWaterDistribute: 'water distribute 22',
  homeGalleryWinterCampaign: 'winter campaign 1',
  campaignWater: 'homepage-card-watervid',
  campaignWinter: 'homepage-caard-winter-30s',
  campaignFood: 'tikiya-200-20s',
  impactInterviewOne: 'film-total-0m38-1m07-audio',
  impactInterviewTwo: 'film-total-1m14-1m40-audio',
  galleryFeatured: 'film total'
} as const;

export const galleryFallbackPublicIds = [
  cloudinaryVideoPublicIds.homeGalleryFeature,
  cloudinaryVideoPublicIds.homeGalleryTikiya,
  cloudinaryVideoPublicIds.homeGalleryWater2,
  cloudinaryVideoPublicIds.homeGalleryWaterDistribute,
  'water will 3',
  'water will built',
  'water will tal al hawa 4',
  cloudinaryVideoPublicIds.homeGalleryWinterCampaign,
  'winter campaing for orphan students'
];

export const cloudinaryVideos = {
  donorsFilm: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.donorsFilm),
  homeGalleryFeature: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.homeGalleryFeature),
  homeGalleryTikiya: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.homeGalleryTikiya),
  homeGalleryWater2: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.homeGalleryWater2),
  homeGalleryWaterDistribute: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.homeGalleryWaterDistribute),
  homeGalleryWinterCampaign: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.homeGalleryWinterCampaign),
  campaignWater: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.campaignWater),
  campaignWinter: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.campaignWinter),
  campaignFood: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.campaignFood),
  impactInterviewOne: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.impactInterviewOne),
  impactInterviewTwo: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.impactInterviewTwo),
  galleryFeatured: makeCloudinaryVideoUrl(cloudinaryVideoPublicIds.galleryFeatured)
};
