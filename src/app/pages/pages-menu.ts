import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'خانه',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'مدیریت کاربران',
    icon: 'people-outline',
    children: [
      {
        title: 'لیست کاربران',
        link: '/pages/tables/user-table',
      },
      {
        title: 'مدیریت کاربران',
        link: '/pages/tables/user-table',
      },
      {
        title: 'افزودن کاربر',
        link: '/pages/forms/add-user',
      },
    ],
  },
  {
    title: 'مدیریت دسته ها',
    icon: 'book-outline',
    children: [
      {
        title: 'لیست دسته بندی ها',
        link: '/pages/tables/category-table',
      },
      {
        title: 'مدیریت دسته بندی ها',
        link: '/pages/tables/category-table',
      },
      {
        title: 'افزودن دسته بندی',
        link: '/pages/forms/add-category',
      },
    ],
  },
  {
    title: 'مدیریت بنر ها',
    icon: 'image-outline',
    children: [
      {
        title: 'لیست بنر ها',
        link: '/pages/tables/banner-table',
      },
      {
        title: 'مدیریت بنر ها',
        link: '/pages/tables/banner-table',
      },
      {
        title: 'افزودن بنر',
        link: '/pages/forms/add-banner',
      },
    ],
  },
  {
    title: 'مدیریت قطعه ها',
    icon: 'hard-drive-outline',
    children: [
      {
        title: 'لیست قطعه ها',
        link: '/pages/tables/piece-table',
      },
      {
        title: 'مدیریت قطعه ها',
        link: '/pages/tables/piece-table',
      },
      {
        title: 'افزودن قطعه',
        link: '/pages/forms/add-piece',
      },
    ],
  },
  {
    title: 'مدیریت درخواست ها',
    icon: 'award-outline',
    children: [
      {
        title: 'لیست درخواست ها',
        link: '/pages/tables/request-table',
      },
      {
        title: 'مدیریت درخواست ها',
        link: '/pages/tables/request-table',
      },
    ],
  },
  {
    title: 'مدیریت قیمت ها',
    icon: 'shield-outline',
    children: [
      {
        title: 'لیست قیمت ها',
        link: '/pages/tables/price-table',
      },
      {
        title: 'مدیریت قیمت ها',
        link: '/pages/tables/price-table',
      },
      {
        title: 'افزودن قیمت',
        link: '/pages/forms/add-price',
      },
    ],
  },
  {
    title: 'مدیریت استاندارد ها',
    icon: 'play-circle-outline',
    children: [
      {
        title: 'لیست استاندارد ها',
        link: '/pages/tables/standard-table',
      },
      {
        title: 'مدیریت استاندارد ها',
        link: '/pages/tables/standard-table',
      },
      {
        title: 'افزودن استاندارد',
        link: '/pages/forms/add-standard',
      },
    ],
  },
  {
    title: 'مدیریت کلاینت ها',
    icon: 'folder-outline',
    children: [
      {
        title: 'مدیریت تولیدکننده ها',
        link: '/pages/tables/producer-table',
      },
      {
        title: 'مدیریت شرکت ها',
        link: '/pages/tables/company-table',
      },
      {
        title: 'مدیریت فروشندگان',
        link: '/pages/tables/seller-table',
      },
      {
        title: 'افزودن تولیدکننده',
        link: '/pages/forms/add-producer',
      },
      {
        title: 'افزودن شرکت',
        link: '/pages/forms/add-company',
      },
      {
        title: 'افزودن فروشنده',
        link: '/pages/forms/add-seller',
      },
    ],
  },
];
