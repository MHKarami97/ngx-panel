import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'خانه',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'کاربران',
    group: true,
  },
  {
    title: 'مدیریت کاربران',
    icon: 'people-outline',
    children: [
      {
        title: 'لیست کاربران',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'مدیریت کاربران',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'افزودن کاربر',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'دسته بندی ها',
    group: true,
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
    title: 'بنرها',
    group: true,
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
    title: 'قطعه ها',
    group: true,
  },
  {
    title: 'مدیریت قطعه ها',
    icon: 'hard-drive-outline',
    children: [
      {
        title: 'لیست قطعه ها',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'مدیریت قطعه ها',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'افزودن قطعه',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'درخواست ها',
    group: true,
  },
  {
    title: 'مدیریت درخواست ها',
    icon: 'award-outline',
    children: [
      {
        title: 'لیست درخواست ها',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'مدیریت درخواست ها',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'کلاینت ها',
    group: true,
  },
  {
    title: 'مدیریت کلاینت ها',
    icon: 'folder-outline',
    children: [
      {
        title: 'مدیریت استاندارد ها',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'مدیریت لیست قیمت ها',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'مدیریت تولیدکننده ها',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'مدیریت شرکت ها',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'مدیریت فروشندگان',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'افزودن استاندارد',
        link: '/pages/forms/layouts',
      },
      {
        title: 'افزودن لیست قیمت',
        link: '/pages/forms/layouts',
      },
      {
        title: 'افزودن تولیدکننده',
        link: '/pages/forms/layouts',
      },
      {
        title: 'افزودن شرکت',
        link: '/pages/forms/layouts',
      },
      {
        title: 'افزودن فروشنده',
        link: '/pages/forms/layouts',
      },
    ],
  },
];
