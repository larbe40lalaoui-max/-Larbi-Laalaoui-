import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from '../data/androidProjectFiles';

export async function downloadAndroidProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root folder in the zip
  const root = zip.folder('NoorQuran-Android-App');
  if (!root) return;

  // Add all Android Native project files
  for (const file of ANDROID_PROJECT_FILES) {
    root.file(file.path, file.content);
  }

  // Add gradlew scripts stubs
  root.file('gradlew', `#!/usr/bin/env sh
# Gradle wrapper script for Unix
exec gradle "$@"
`);
  root.file('gradlew.bat', `@rem Gradle wrapper script for Windows
@gradle %*
`);

  // Add gradle-wrapper.properties
  const gradleWrapperFolder = root.folder('gradle')?.folder('wrapper');
  if (gradleWrapperFolder) {
    gradleWrapperFolder.file(
      'gradle-wrapper.properties',
      `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.11.1-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`
    );
  }

  // Generate the zip blob
  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  // Trigger download in browser
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  link.download = 'NoorQuran-Android-Native-AAB-Ready.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
