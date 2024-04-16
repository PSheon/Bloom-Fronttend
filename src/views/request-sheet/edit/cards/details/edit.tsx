// ** React Imports
import { forwardRef, ChangeEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Collapse from '@mui/material/Collapse'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Core Component Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/requestSheet'

// ** Util Imports
import { getRequestSheetOperationalMethodAttributes, getRequestSheetCooperationIndustriesAttributes } from 'src/utils'

// ** Type Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

const schema = yup.object().shape({
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

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const DetailsEditCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Hooks
  const [updateRequestSheet, { isLoading: isUpdateRequestSheetLoading }] = useUpdateMeOneMutation()
  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      schoolOrInstitution: initRequestSheetEntity.schoolOrInstitution,
      operationalMethod: initRequestSheetEntity.operationalMethod,
      cooperationIndustries: initRequestSheetEntity.cooperationIndustries,
      cooperationIndustriesOthers: initRequestSheetEntity.cooperationIndustriesOthers || '',
      programStartedAt: new Date(initRequestSheetEntity.programStartedAt),
      programCompletedAt: new Date(initRequestSheetEntity.programCompletedAt),
      firstEntryAt: new Date(initRequestSheetEntity.firstEntryAt)
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Vars
  const newRequestSheetCooperationIndustries = watch('cooperationIndustries')

  // ** Logics
  const onSubmit = async (data: FormData) => {
    await updateRequestSheet({
      id: initRequestSheetEntity.id,
      data: {
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

    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
  }

  return (
    <DatePickerWrapper>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader
            title={
              <Typography variant='h6' sx={{ fontWeight: 600 }}>
                編輯申請細節
              </Typography>
            }
          />
          <CardContent>
            <Stack spacing={4} direction='column'>
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
                              getRequestSheetOperationalMethodAttributes("Technical High School + Bachelor's Degree")
                                .displayName
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
                              getRequestSheetOperationalMethodAttributes("Bachelor's Degree in Technology").displayName
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
                            label={getRequestSheetCooperationIndustriesAttributes('Intelligent Machinery').displayName}
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
                            label={getRequestSheetCooperationIndustriesAttributes('Defense and Strategic').displayName}
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
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.cooperationIndustries.message}</FormHelperText>
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

              <Stack spacing={2}>
                <Divider />
              </Stack>

              <Stack spacing={2} direction='row' justifyContent='flex-end'>
                <LoadingButton
                  loading={isUpdateRequestSheetLoading}
                  disabled={
                    !isDirty ||
                    Boolean(
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
                  endIcon={<Icon icon='mdi:edit-outline' />}
                >
                  更新
                </LoadingButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </DatePickerWrapper>
  )
}

export default DetailsEditCard
