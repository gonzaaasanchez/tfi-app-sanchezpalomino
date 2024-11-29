import { UserModel } from '@packages/common'
import { PlaceType } from '../ReservationModel'
import { ReservationStatus } from '../ReservationModel'

export const GetReceivedReservatiosMockedResponse = {
  confirmed: [
    {
      id: 'c1',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u1',
        firstname: 'Juan',
        lastname: 'Pérez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Home',
      visitsPerDay: 2,
      pets: [
        {
          id: 'p1',
          name: 'Firulais',
          comment:
            'Mi perro hermoso Firulais es mi gran compañero. Le gusta mucho salir a pasear. Hay que tener cuidado porque, si bien es muy obediente, siempre es muy apresurado para cruzar la calle y es peligroso',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Grande' },
            { id: '2', name: 'Edad', value: '3' },
            { id: '3', name: 'Personalidad', value: 'Tranquilo' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
        {
          id: 'p2',
          name: 'Mishu',
          comment:
            'Mishu es mi gata y es muy amigable. Le gusta salir a tomar solcito al balcón y jugar con su cañita de pescar. Come atún y alimento sin problemas. Le gusta tomar agua de la canilla',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '2', name: 'Gato' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Pequeño' },
            { id: '2', name: 'Edad', value: '1' },
            { id: '3', name: 'Personalidad', value: 'Tranquilo' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
      ],
      startDate: '2024-11-20',
      endDate: '2024-11-21',
      location: 'Av. Pellegrini 1234, Rosario, Argentina',
      status: 'confirmed',
      distance: 2.5,
    },
    {
      id: 'c2',
      userOwner: new UserModel({
        id: 'u2',
        firstname: 'María',
        lastname: 'Gómez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Visit',
      visitsPerDay: 3,
      pets: [
        {
          id: 'p3',
          name: 'Toby',
          comment: 'Toby es un crack, se porta re bien',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Mediano' },
            { id: '2', name: 'Edad', value: '7' },
            { id: '3', name: 'Personalidad', value: 'Enérgico' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
      ],
      startDate: '2024-11-22',
      endDate: '2024-11-23',
      location: 'Calle Córdoba 567, Rosario, Argentina',
      status: 'confirmed',
      distance: 1.8,
    },
    {
      id: 'c3',
      userOwner: new UserModel({
        id: 'u3',
        firstname: 'Lucía',
        lastname: 'Ramírez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Home',
      visitsPerDay: 1,
      pets: [
        {
          id: 'p4',
          name: 'Luna',
          comment: 'Es una gata especial, mi gran compañera.',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '2', name: 'Gato' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Pequeño' },
            { id: '2', name: 'Edad', value: '3' },
            { id: '3', name: 'Personalidad', value: 'Tranquila' },
            {
              id: '4',
              name: 'Necesita medicación',
              value: '1 pastilla por día',
            },
          ],
        },
      ],
      startDate: '2024-11-23',
      endDate: '2024-11-24',
      location: 'Bv. Oroño 890, Rosario, Argentina',
      status: 'confirmed',
      distance: 3.0,
    },
    {
      id: 'c4',
      userOwner: new UserModel({
        id: 'u4',
        firstname: 'Carlos',
        lastname: 'Fernández',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Visit',
      visitsPerDay: 2,
      pets: [
        {
          id: 'p5',
          name: 'Bobby',
          comment:
            'Bobby es un perro rescatado y es un poco miedoso pero tranquilo',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Pequeño' },
            { id: '2', name: 'Edad', value: '8' },
            { id: '3', name: 'Personalidad', value: 'Miedoso' },
            { id: '4', name: 'Necesita medicación', value: '2 pastillas día' },
          ],
        },
      ],
      startDate: '2024-11-24',
      endDate: '2024-11-25',
      location: 'Calle Mendoza 2345, Rosario, Argentina',
      status: 'confirmed',
      distance: 4.1,
    },
    {
      id: 'c5',
      userOwner: new UserModel({
        id: 'u5',
        firstname: 'Ana',
        lastname: 'Martínez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Home',
      visitsPerDay: 3,
      pets: [
        {
          id: 'p6',
          name: 'Simba',
          comment:
            'Mi perro hermoso Simba es mi gran compañero. Le gusta mucho salir a pasear.',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Grande' },
            { id: '2', name: 'Edad', value: '3' },
            { id: '3', name: 'Personalidad', value: 'Tranquilo' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
        {
          id: 'p7',
          name: 'Nala',
          comment: 'Nala es mi gata y es muy amigable.',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '2', name: 'Gato' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Pequeño' },
            { id: '2', name: 'Edad', value: '1' },
            { id: '3', name: 'Personalidad', value: 'Tranquilo' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
      ],
      startDate: '2024-11-26',
      endDate: '2024-11-27',
      location: 'Av. Francia 1234, Rosario, Argentina',
      status: 'confirmed',
      distance: 1.2,
    },
    {
      id: 'c6',
      userOwner: new UserModel({
        id: 'u6',
        firstname: 'Laura',
        lastname: 'Sánchez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Home',
      visitsPerDay: 1,
      pets: [
        {
          id: 'p8',
          name: 'Max',
          comment: 'Max es mestizo y se llama así por Max Verstappen',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Pequeño' },
            { id: '2', name: 'Edad', value: '5' },
            { id: '3', name: 'Personalidad', value: 'Jueguetón' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
      ],
      startDate: '2024-11-28',
      endDate: '2024-11-30',
      location: 'San Lorenzo 800, Rosario, Argentina',
      status: 'confirmed',
      distance: 2.7,
    },
    {
      id: 'c7',
      userOwner: new UserModel({
        id: 'u7',
        firstname: 'Pablo',
        lastname: 'López',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Visit',
      visitsPerDay: 2,
      pets: [
        {
          id: 'p9',
          name: 'Coco',
          comment: 'Es muy cariñoso con todo el mundo.',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Grande' },
            { id: '2', name: 'Edad', value: '4' },
            { id: '3', name: 'Personalidad', value: 'Cariñoso' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
      ],
      startDate: '2024-12-01',
      endDate: '2024-12-02',
      location: 'Sarmiento 500, Rosario, Argentina',
      status: 'confirmed',
      distance: 0.9,
    },
    {
      id: 'c8',
      userOwner: new UserModel({
        id: 'u8',
        firstname: 'Sofía',
        lastname: 'Ortiz',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Visit',
      visitsPerDay: 3,
      pets: [
        {
          id: 'p10',
          name: 'Rocky',
          comment: 'Rocky es un caniche juguetón',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Mediano' },
            { id: '2', name: 'Edad', value: '2' },
            { id: '3', name: 'Personalidad', value: 'Enérgico' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
      ],
      startDate: '2024-12-03',
      endDate: '2024-12-05',
      location: 'Entre Ríos 1234, Rosario, Argentina',
      status: 'confirmed',
      distance: 3.2,
    },
    {
      id: 'c9',
      userOwner: new UserModel({
        id: 'u9',
        firstname: 'Miguel',
        lastname: 'Hernández',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Home',
      visitsPerDay: 1,
      pets: [
        {
          id: 'p11',
          name: 'Tommy',
          comment: 'Muy simpático con otros perros',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Grande' },
            { id: '2', name: 'Edad', value: '6' },
            { id: '3', name: 'Personalidad', value: 'Amistoso' },
            { id: '4', name: 'Necesita medicación', value: '1 pastilla noche' },
          ],
        },
      ],
      startDate: '2024-12-06',
      endDate: '2024-12-08',
      location: 'Córdoba 123, Rosario, Argentina',
      status: 'confirmed',
      distance: 4.5,
    },
    {
      id: 'c10',
      userOwner: new UserModel({
        id: 'u10',
        firstname: 'Julián',
        lastname: 'Alvarez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Visit',
      visitsPerDay: 3,
      pets: [
        {
          id: 'p12',
          name: 'Duke',
          comment: 'Es un perro bulldog.',
          photoUrl:
            'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
          type: { id: '1', name: 'Perro' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Grande' },
            { id: '2', name: 'Edad', value: '2' },
            { id: '3', name: 'Personalidad', value: 'Tranquilo' },
            { id: '4', name: 'Necesita medicación', value: '2 pastillas día' },
          ],
        },
      ],
      startDate: '2024-12-09',
      endDate: '2024-12-11',
      location: 'Mitre 890, Rosario, Argentina',
      status: 'confirmed',
      distance: 1.7,
    },
  ],

  pending: [
    {
      id: 'p1',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u11',
        firstname: 'Federico',
        lastname: 'López',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
      }),
      placeType: PlaceType.Visit,
      visitsPerDay: 1,
      pets: [{ id: 'p14', name: 'Coco', type: 'Gato' }],
      startDate: '2024-11-28',
      endDate: '2024-11-29',
      location: 'Calle Alem 450, Rosario, Argentina',
      status: ReservationStatus.Pending,
      distance: 2.0,
    },
    {
      id: 'p2',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u12',
        firstname: 'Jorge',
        lastname: 'Vega',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
      }),
      placeType: PlaceType.Home,
      visitsPerDay: 3,
      pets: [{ id: 'p15', name: 'Pucho', type: 'Perro' }],
      startDate: '2024-12-02',
      endDate: '2024-12-03',
      location: 'Calle San Luis 897, Rosario, Argentina',
      status: ReservationStatus.Pending,
      distance: 3.5,
    },
    {
      id: 'p3',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u13',
        firstname: 'Paola',
        lastname: 'González',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
      }),
      placeType: PlaceType.Visit,
      visitsPerDay: 2,
      pets: [{ id: 'p16', name: 'Charly', type: 'Perro' }],
      startDate: '2024-12-06',
      endDate: '2024-12-07',
      location: 'Calle Belgrano 123, Rosario, Argentina',
      status: ReservationStatus.Pending,
      distance: 4.0,
    },
    {
      id: 'p4',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u14',
        firstname: 'Ricardo',
        lastname: 'Martínez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
      }),
      placeType: PlaceType.Home,
      visitsPerDay: 2,
      pets: [{ id: 'p17', name: 'Sasha', type: 'Gato' }],
      startDate: '2024-12-09',
      endDate: '2024-12-10',
      location: 'Calle Rivadavia 225, Rosario, Argentina',
      status: ReservationStatus.Pending,
      distance: 1.7,
    },
    {
      id: 'p5',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u15',
        firstname: 'Marta',
        lastname: 'Soto',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
      }),
      placeType: PlaceType.Visit,
      visitsPerDay: 1,
      pets: [{ id: 'p18', name: 'Tito', type: 'Perro' }],
      startDate: '2024-12-10',
      endDate: '2024-12-11',
      location: 'Calle San Juan 1000, Rosario, Argentina',
      status: ReservationStatus.Pending,
      distance: 2.2,
    },
    {
      id: 'p6',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u16',
        firstname: 'Rosa',
        lastname: 'Torres',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
      }),
      placeType: PlaceType.Home,
      visitsPerDay: 1,
      pets: [{ id: 'p19', name: 'Tango', type: 'Gato' }],
      startDate: '2024-12-15',
      endDate: '2024-12-16',
      location: 'Calle España 785, Rosario, Argentina',
      status: ReservationStatus.Pending,
      distance: 1.5,
    },
    {
      id: 'p7',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u17',
        firstname: 'Carlos',
        lastname: 'Rivas',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
      }),
      placeType: PlaceType.Home,
      visitsPerDay: 3,
      pets: [{ id: 'p20', name: 'Nina', type: 'Perro' }],
      startDate: '2024-12-12',
      endDate: '2024-12-13',
      location: 'Av. Corrientes 345, Rosario, Argentina',
      status: ReservationStatus.Pending,
      distance: 3.0,
    },
  ],

  cancelled: [
    {
      id: 'ca1',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u18',
        firstname: 'Susana',
        lastname: 'Méndez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp',
      }),
      placeType: PlaceType.Visit,
      visitsPerDay: 2,
      pets: [{ id: 'p21', name: 'Rocco', type: 'Perro' }],
      startDate: '2024-12-16',
      endDate: '2024-12-17',
      location: 'Calle Soler 1345, Rosario, Argentina',
      status: ReservationStatus.CancelledOwner,
      distance: 4.2,
    },
    {
      id: 'ca2',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u19',
        firstname: 'Gabriela',
        lastname: 'Martínez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp',
      }),
      placeType: PlaceType.Home,
      visitsPerDay: 3,
      pets: [{ id: 'p22', name: 'Chester', type: 'Gato' }],
      startDate: '2024-12-17',
      endDate: '2024-12-18',
      location: 'Calle Pueyrredón 750, Rosario, Argentina',
      status: ReservationStatus.CancelledOwner,
      distance: 2.6,
    },
    {
      id: 'ca3',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u20',
        firstname: 'Elena',
        lastname: 'Bravo',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp',
      }),
      placeType: PlaceType.Visit,
      visitsPerDay: 1,
      pets: [{ id: 'p23', name: 'Neko', type: 'Gato' }],
      startDate: '2024-12-19',
      endDate: '2024-12-20',
      location: 'Calle Santa Fe 452, Rosario, Argentina',
      status: ReservationStatus.CancelledOwner,
      distance: 3.8,
    },
    {
      id: 'ca4',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u21',
        firstname: 'Alberto',
        lastname: 'Hernández',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp',
      }),
      placeType: PlaceType.Home,
      visitsPerDay: 1,
      pets: [{ id: 'p24', name: 'Peque', type: 'Perro' }],
      startDate: '2024-12-21',
      endDate: '2024-12-22',
      location: 'Bv. Belgrano 1200, Rosario, Argentina',
      status: ReservationStatus.CancelledOwner,
      distance: 4.1,
    },
    {
      id: 'ca5',
      userCarer: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userOwner: new UserModel({
        id: 'u22',
        firstname: 'Valeria',
        lastname: 'Sánchez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp',
      }),
      placeType: PlaceType.Visit,
      visitsPerDay: 2,
      pets: [{ id: 'p25', name: 'Chico', type: 'Perro' }],
      startDate: '2024-12-22',
      endDate: '2024-12-23',
      location: 'Calle España 876, Rosario, Argentina',
      status: ReservationStatus.CancelledOwner,
      distance: 2.7,
    },
  ],
}

export const GetSentReservatiosMockedResponse = {
  pending: [
    {
      id: 'c1',
      userOwner: new UserModel({
        id: 'u100',
        firstname: 'Gonzalo',
        lastname: 'Sanchez',
        phoneNumber: '+54 341 5891365',
        avatar:
          'https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/38507167_10155672692512286_2925648923655667712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Emq1wkR3QpEQ7kNvgFsELag&_nc_zt=23&_nc_ht=scontent.fros2-2.fna&_nc_gid=AXI9zPAM28CVAN7nBukIZrC&oh=00_AYAKjeQ0WIJ0uAF-egyeNR3X8Udn8mgCplhMVh9VVQBpZA&oe=67705451',
      }),
      userCarer: new UserModel({
        id: 'u1',
        firstname: 'Juan',
        lastname: 'Pérez',
        phoneNumber: '+54 341 5678907',
        avatar:
          'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
      }),
      placeType: 'Home',
      visitsPerDay: 2,
      pets: [
        {
          id: 'p1',
          name: 'Rogelio',
          comment:
            'Rogelito es mi gato más grande. Es mimoso pero muy guardián de su casa, cuando llega alguien nuevo no se deja tocar y está atento a todos sus movimientos. Le gusta mucho que le pasen el cepillo y odia mucho el calor, por eso se tira bajo el aire acondicionado en verano.',
          photoUrl:
            'https://scontent.fros2-1.fna.fbcdn.net/v/t1.6435-9/184636073_10158208025062286_8679982414475535144_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LmsBxn9NlTAQ7kNvgF_Mui4&_nc_zt=23&_nc_ht=scontent.fros2-1.fna&_nc_gid=AJVYJA_DyqRqNt84zjpRtgc&oh=00_AYBBwu2nxR88K_gOczx5OiryXg6PxZE2mdStKIpPPVEeJw&oe=67715607',
          type: { id: '2', name: 'Gato' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Grande' },
            { id: '2', name: 'Edad', value: '10' },
            { id: '3', name: 'Personalidad', value: 'Tranquilo' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
        {
          id: 'p2',
          name: 'Vicente',
          comment:
            'Vicentito es el hermano menor de Rogelio. Es muy amistoso y cuando conoce a alguien enseguida grita para pedir atención. Le encantan los mimos pero no le gustan los besos ni estar alzado.',
          photoUrl:
            'https://instagram.fros2-1.fna.fbcdn.net/v/t51.29350-15/278039408_503422914839524_3665725915865994393_n.jpg?stp=dst-jpg_e35_p1080x1080&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fros2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=lfojvZhPK94Q7kNvgGeXU51&_nc_gid=4518dd9f8df44630966402462f60219c&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MjgwOTc0OTA1MTQ0MTg0Nzk3OQ%3D%3D.3-ccb7-5&oh=00_AYB-WqMzg9OYDfo4Rd-jbFY154MhtgBGd5pAAbtjuf--Ww&oe=674FC30E&_nc_sid=7a9f4b',
          type: { id: '2', name: 'Gato' },
          characteristics: [
            { id: '1', name: 'Tamaño', value: 'Pequeño' },
            { id: '2', name: 'Edad', value: '3' },
            { id: '3', name: 'Personalidad', value: 'Tranquilo' },
            { id: '4', name: 'Necesita medicación', value: 'No' },
          ],
        },
      ],
      startDate: '2024-11-20',
      endDate: '2024-11-21',
      location: 'San Nicolás 972, Rosario, Argentina',
      status: 'pending',
      distance: 2.5,
    },
  ],
}
