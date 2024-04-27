// ** React Imports
import { forwardRef, ChangeEvent } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import CardContent from '@mui/material/CardContent'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormLabel from '@mui/material/FormLabel'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Components
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'

// ** Custom Component Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import RequestSheetAddBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import RequestSheetAddInformationCard from 'src/views/request-sheet/add/InformationCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useCreateMutation } from 'src/store/api/management/requestSheet'

// ** Util Imports
import {
  getRequestSheetTypeAttributes,
  getRequestSheetOperationalMethodAttributes,
  getRequestSheetCooperationIndustriesAttributes
} from 'src/utils'

// ** Type Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'

const schema = yup.object().shape({
  title: yup.string().required(),
  type: yup.string().required(),
  referenceCaseNumber: yup
    .string()
    .when('type', ([type], schema) => (type === 'Continuation' ? schema.required() : schema.nullable())),
  schoolOrInstitution: yup.string().required(),
  operationalMethod: yup.string().required(),
  cooperationIndustries: yup.string().required(),
  cooperationIndustriesOthers: yup
    .string()
    .when('cooperationIndustries', ([cooperationIndustries], schema) =>
      cooperationIndustries === 'Others' ? schema.required() : schema.nullable()
    ),
  programStartedAt: yup.string().required(),
  programCompletedAt: yup.string().required(),
  firstEntryAt: yup.string().required()
})

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

interface FormData {
  title: string
  type: string
  referenceCaseNumber?: string
  schoolOrInstitution: string
  operationalMethod: string
  cooperationIndustries: string
  cooperationIndustriesOthers?: string
  programStartedAt: DateType
  programCompletedAt: DateType
  firstEntryAt: DateType
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const RequestSheetAddPage = () => {
  // ** Hooks
  const session = useSession()
  const router = useRouter()

  const [createNewRequestSheet, { data: createdRequestSheet, isLoading: isCreateNewRequestSheetLoading }] =
    useCreateMutation()

  const {
    control,
    watch,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      title: '',
      type: '',
      referenceCaseNumber: '',
      schoolOrInstitution: '',
      operationalMethod: '',
      cooperationIndustries: '',
      cooperationIndustriesOthers: '',
      programStartedAt: null,
      programCompletedAt: null,
      firstEntryAt: null
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Vars
  const newRequestSheetType = watch('type')
  const newRequestSheetCooperationIndustries = watch('cooperationIndustries')

  // ** Logics
  const onSubmit = async (data: FormData) => {
    await createNewRequestSheet({
      data: {
        applicant: session.data!.user.id,
        title: data.title,
        type: data.type,
        ...(data.type !== 'Continuation' && {
          referenceCaseNumber: data.referenceCaseNumber
        }),
        schoolOrInstitution: data.schoolOrInstitution,
        operationalMethod: data.operationalMethod,
        cooperationIndustries: data.cooperationIndustries,
        ...(data.cooperationIndustries !== 'Others' && {
          cooperationIndustriesOthers: data.cooperationIndustriesOthers
        }),
        programStartedAt: new Date(data.programStartedAt as Date),
        programCompletedAt: new Date(data.programCompletedAt as Date),
        firstEntryAt: new Date(data.firstEntryAt as Date)
      }
    })
  }

  // ** Side Effects
  if (createdRequestSheet) {
    router.push(`/request-sheet/edit/${createdRequestSheet.id}`)
  }

  return (
    <DatePickerWrapper>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <RequestSheetAddBreadcrumbs
                  pageLevels={[{ title: '申請管理', href: '/request-sheet/list' }, { title: '建立申請' }]}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={9} md={8} xs={12}>
            <Card>
              <CardContent>
                <Stack spacing={4} direction='column'>
                  {/* Title */}
                  <Typography variant='h6'>標題</Typography>
                  <FormControl fullWidth>
                    <Controller
                      name='title'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          size='small'
                          value={value}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                  專班
                                </Typography>
                              </InputAdornment>
                            )
                          }}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.title)}
                        />
                      )}
                    />
                    {errors.title && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>
                    )}
                  </FormControl>

                  {/* Type */}
                  <Typography variant='h6'>辦理種類</Typography>
                  <FormControl error={Boolean(errors.type)}>
                    <Controller
                      name='type'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RadioGroup row {...field} aria-label='辦理種類' name='validation-type-radio'>
                          <FormControlLabel
                            value='Newly Established'
                            label={getRequestSheetTypeAttributes('Newly Established').displayName}
                            sx={errors.type ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.type ? { color: 'error.main' } : null} />}
                          />
                          <FormControlLabel
                            value='Existing And Reevaluation'
                            label={getRequestSheetTypeAttributes('Existing And Reevaluation').displayName}
                            sx={errors.type ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.type ? { color: 'error.main' } : null} />}
                          />
                          <FormControlLabel
                            value='Regular Student'
                            label={getRequestSheetTypeAttributes('Regular Student').displayName}
                            sx={errors.type ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.type ? { color: 'error.main' } : null} />}
                          />
                          <FormControlLabel
                            value='Overseas Student'
                            label={getRequestSheetTypeAttributes('Overseas Student').displayName}
                            sx={errors.type ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.type ? { color: 'error.main' } : null} />}
                          />
                          <FormControlLabel
                            value='Second Generation New Immigrant'
                            label={getRequestSheetTypeAttributes('Second Generation New Immigrant').displayName}
                            sx={errors.type ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.type ? { color: 'error.main' } : null} />}
                          />
                          <FormControlLabel
                            value='Continuation'
                            label={getRequestSheetTypeAttributes('Continuation').displayName}
                            sx={errors.type ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.type ? { color: 'error.main' } : null} />}
                          />
                        </RadioGroup>
                      )}
                    />
                    {errors.type && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-type-radio'>
                        {errors.type.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* 核定公文文號 */}
                  <Collapse in={newRequestSheetType === 'Continuation'}>
                    <FormControl fullWidth>
                      <FormLabel>核定公文文號</FormLabel>
                      <Controller
                        name='referenceCaseNumber'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            size='small'
                            value={value}
                            fullWidth
                            placeholder='○○○○○○○○○○○'
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.referenceCaseNumber)}
                          />
                        )}
                      />
                      {errors.referenceCaseNumber && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {errors.referenceCaseNumber.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Collapse>

                  {/* School Or Institution */}
                  <Typography variant='h6'>辦理學校/機構(全銜)</Typography>
                  <FormControl fullWidth>
                    <Controller
                      name='schoolOrInstitution'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          size='small'
                          value={value}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Tooltip
                                  title={
                                    <Box>
                                      <Typography variant='body1'>請填寫辦理學校或機構的全銜，例如：</Typography>
                                      <Typography variant='body2'>- ○○○【技專校院】</Typography>
                                      <Typography variant='body2'>- ○○○【技高(五專)】</Typography>
                                      <Typography variant='body2'>- ○○○【國中】</Typography>
                                      <Typography variant='body2'>- 勞動部勞動力發展署○○○分署</Typography>
                                    </Box>
                                  }
                                >
                                  <IconButton>
                                    <Icon icon='mdi:progress-question' />
                                  </IconButton>
                                </Tooltip>
                              </InputAdornment>
                            )
                          }}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.schoolOrInstitution)}
                        />
                      )}
                    />
                    {errors.schoolOrInstitution && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.schoolOrInstitution.message}</FormHelperText>
                    )}
                  </FormControl>

                  {/* Operational Method */}
                  <Typography variant='h6'>計畫運作方式</Typography>
                  <FormControl error={Boolean(errors.operationalMethod)}>
                    <Controller
                      name='operationalMethod'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Grid container spacing={6}>
                          <Grid item xs={12} md={6}>
                            <FormLabel>高級中等學校銜接技專校院方式</FormLabel>
                            <RadioGroup
                              {...field}
                              aria-label='辦理種類'
                              name='validation-operational-method-highschool-radio'
                            >
                              <FormControlLabel
                                value='Technical High School + Junior College'
                                label={
                                  getRequestSheetOperationalMethodAttributes('Technical High School + Junior College')
                                    .displayName
                                }
                                sx={errors.operationalMethod ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.operationalMethod ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Technical High School + Junior College + Associate Degree'
                                label={
                                  getRequestSheetOperationalMethodAttributes(
                                    'Technical High School + Junior College + Associate Degree'
                                  ).displayName
                                }
                                sx={errors.operationalMethod ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.operationalMethod ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value="Technical High School + Bachelor's Degree"
                                label={
                                  getRequestSheetOperationalMethodAttributes(
                                    "Technical High School + Bachelor's Degree"
                                  ).displayName
                                }
                                sx={errors.operationalMethod ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.operationalMethod ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value="Junior High School + Technical High School + Bachelor's Degree"
                                label={
                                  getRequestSheetOperationalMethodAttributes(
                                    "Junior High School + Technical High School + Bachelor's Degree"
                                  ).displayName
                                }
                                sx={errors.operationalMethod ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.operationalMethod ? { color: 'error.main' } : null} />}
                              />
                            </RadioGroup>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <RadioGroup
                              {...field}
                              aria-label='技專校院在職進修方式'
                              name='validation-operational-method-technical-program-radio'
                            >
                              <FormLabel>技專校院在職進修方式</FormLabel>
                              <FormControlLabel
                                value='Associate Degree with a Two-Year Technical Program'
                                label={
                                  getRequestSheetOperationalMethodAttributes(
                                    'Associate Degree with a Two-Year Technical Program'
                                  ).displayName
                                }
                                sx={errors.operationalMethod ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.operationalMethod ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Associate Degree with a Five-Year Technical Program'
                                label={
                                  getRequestSheetOperationalMethodAttributes(
                                    'Associate Degree with a Five-Year Technical Program'
                                  ).displayName
                                }
                                sx={errors.operationalMethod ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.operationalMethod ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value="Bachelor's Degree in Technology"
                                label={
                                  getRequestSheetOperationalMethodAttributes("Bachelor's Degree in Technology")
                                    .displayName
                                }
                                sx={errors.operationalMethod ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.operationalMethod ? { color: 'error.main' } : null} />}
                              />
                            </RadioGroup>
                          </Grid>
                        </Grid>
                      )}
                    />
                    {errors.operationalMethod && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.operationalMethod.message}</FormHelperText>
                    )}
                  </FormControl>

                  {/* Cooperation Industries */}
                  <Typography variant='h6'>合作產業與類別</Typography>
                  <FormControl error={Boolean(errors.cooperationIndustries)}>
                    <Controller
                      name='cooperationIndustries'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Stack spacing={6}>
                          <FormControl>
                            <FormLabel>特殊類科或嚴重缺工產業</FormLabel>
                            <RadioGroup
                              row
                              {...field}
                              aria-label='特殊類科或嚴重缺工產業'
                              name='validation-cooperation-industries-radio'
                            >
                              <FormControlLabel
                                value='Intelligent Machinery'
                                label={
                                  getRequestSheetCooperationIndustriesAttributes('Intelligent Machinery').displayName
                                }
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Semiconductor'
                                label={getRequestSheetCooperationIndustriesAttributes('Semiconductor').displayName}
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Data Services'
                                label={getRequestSheetCooperationIndustriesAttributes('Data Services').displayName}
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Shipbuilding'
                                label={getRequestSheetCooperationIndustriesAttributes('Shipbuilding').displayName}
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Smart Agriculture'
                                label={getRequestSheetCooperationIndustriesAttributes('Smart Agriculture').displayName}
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                            </RadioGroup>
                          </FormControl>
                          <FormControl>
                            <FormLabel>政府提倡核心產業</FormLabel>
                            <RadioGroup
                              row
                              {...field}
                              aria-label='政府提倡核心產業'
                              name='validation-core-industries-radio'
                            >
                              <FormControlLabel
                                value='Information and Digital'
                                label={
                                  getRequestSheetCooperationIndustriesAttributes('Information and Digital').displayName
                                }
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Cybersecurity Excellence Technology'
                                label={
                                  getRequestSheetCooperationIndustriesAttributes('Cybersecurity Excellence Technology')
                                    .displayName
                                }
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Precision Health'
                                label={getRequestSheetCooperationIndustriesAttributes('Precision Health').displayName}
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Green Energy and Renewable Resources'
                                label={
                                  getRequestSheetCooperationIndustriesAttributes('Green Energy and Renewable Resources')
                                    .displayName
                                }
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Defense and Strategic'
                                label={
                                  getRequestSheetCooperationIndustriesAttributes('Defense and Strategic').displayName
                                }
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Civilian Livelihood and Preparedness'
                                label={
                                  getRequestSheetCooperationIndustriesAttributes('Civilian Livelihood and Preparedness')
                                    .displayName
                                }
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                              <FormControlLabel
                                value='Others'
                                label={getRequestSheetCooperationIndustriesAttributes('Others').displayName}
                                sx={errors.cooperationIndustries ? { color: 'error.main' } : null}
                                control={<Radio sx={errors.cooperationIndustries ? { color: 'error.main' } : null} />}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Stack>
                      )}
                    />
                    {errors.cooperationIndustries && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.cooperationIndustries.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Others */}
                  <Collapse in={newRequestSheetCooperationIndustries === 'Others'}>
                    <Stack spacing={2} direction='column'>
                      <Typography variant='body1' color='text.secondary'>
                        其他產業
                      </Typography>
                      <FormControl fullWidth>
                        <Controller
                          name='cooperationIndustriesOthers'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              size='small'
                              value={value}
                              fullWidth
                              placeholder=''
                              onBlur={onBlur}
                              onChange={onChange}
                              error={Boolean(errors.cooperationIndustriesOthers)}
                            />
                          )}
                        />
                        {errors.cooperationIndustriesOthers && (
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.cooperationIndustriesOthers.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Collapse>

                  {/* 開班及入廠規劃期程 */}
                  <Typography variant='h6'>開班及入廠規劃期程</Typography>
                  <Stack spacing={6} direction='row'>
                    <FormControl fullWidth>
                      <FormLabel>開班期程階段</FormLabel>
                      <Controller
                        name='programStartedAt'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            selected={value}
                            showYearDropdown
                            showMonthDropdown
                            onChange={e => onChange(e)}
                            dateFormat='yyyy/MM/dd'
                            placeholderText='YYYY/MM/DD'
                            customInput={
                              <CustomInput
                                value={value}
                                onChange={onChange}
                                label=''
                                error={Boolean(errors.programStartedAt)}
                                aria-describedby='validation-program-started-at'
                              />
                            }
                          />
                        )}
                      />
                      {errors.programStartedAt && (
                        <FormHelperText sx={{ mx: 3.5, color: 'error.main' }}>
                          {errors.programStartedAt.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel>階段完成日期</FormLabel>
                      <Controller
                        name='programCompletedAt'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            selected={value}
                            showYearDropdown
                            showMonthDropdown
                            onChange={e => onChange(e)}
                            dateFormat='yyyy/MM/dd'
                            placeholderText='YYYY/MM/DD'
                            customInput={
                              <CustomInput
                                value={value}
                                onChange={onChange}
                                label=''
                                error={Boolean(errors.programCompletedAt)}
                                aria-describedby='validation-program-completed-at'
                              />
                            }
                          />
                        )}
                      />
                      {errors.programCompletedAt && (
                        <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                          {errors.programCompletedAt.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Stack>

                  <Stack spacing={2} direction='column'>
                    <Typography variant='body1' color='text.secondary'>
                      第一次入廠時間
                    </Typography>
                    <Stack spacing={6} direction='row'>
                      <FormControl fullWidth>
                        <Controller
                          name='firstEntryAt'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <DatePicker
                              selected={value}
                              showYearDropdown
                              showMonthDropdown
                              onChange={e => onChange(e)}
                              dateFormat='yyyy/MM/dd'
                              placeholderText='YYYY/MM/DD'
                              customInput={
                                <CustomInput
                                  value={value}
                                  onChange={onChange}
                                  label=''
                                  error={Boolean(errors.firstEntryAt)}
                                  aria-describedby='validation-program-started-at'
                                />
                              }
                            />
                          )}
                        />
                        {errors.firstEntryAt && (
                          <FormHelperText sx={{ mx: 3.5, color: 'error.main' }}>
                            {errors.firstEntryAt.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <LoadingButton
                      fullWidth
                      loading={isCreateNewRequestSheetLoading}
                      disabled={
                        !isDirty ||
                        Boolean(
                          errors.title ||
                            errors.type ||
                            errors.referenceCaseNumber ||
                            errors.schoolOrInstitution ||
                            errors.operationalMethod ||
                            errors.cooperationIndustries ||
                            errors.cooperationIndustriesOthers ||
                            errors.programStartedAt ||
                            errors.programCompletedAt ||
                            errors.firstEntryAt
                        )
                      }
                      type='submit'
                      variant='contained'
                      endIcon={<Icon icon='mdi:send-outline' />}
                    >
                      建立
                    </LoadingButton>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <RequestSheetAddInformationCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </DatePickerWrapper>
  )
}

RequestSheetAddPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default RequestSheetAddPage
